import { google } from 'googleapis'

function parsePrivateKey(key: string): string {
    // Handle different formats of private key from env vars:
    // 1. Vercel/dotenv may store \n as literal \\n (two chars)
    // 2. Or as actual newlines
    // 3. Or wrapped in quotes
    let parsed = key.trim()

    // Remove surrounding quotes if present
    if ((parsed.startsWith('"') && parsed.endsWith('"')) ||
        (parsed.startsWith("'") && parsed.endsWith("'"))) {
        parsed = parsed.slice(1, -1)
    }

    // Replace literal \n with actual newlines
    parsed = parsed.replace(/\\n/g, '\n')

    return parsed
}

function getAuth() {
    const config = useRuntimeConfig()

    if (!config.googleSheetsClientEmail || !config.googleSheetsPrivateKey) {
        return null
    }

    const privateKey = parsePrivateKey(config.googleSheetsPrivateKey)

    return new google.auth.GoogleAuth({
        credentials: {
            client_email: config.googleSheetsClientEmail,
            private_key: privateKey,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { name, phone } = body

    if (!name || !phone) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Nama dan nomor HP harus diisi',
        })
    }

    const config = useRuntimeConfig()
    const auth = getAuth()

    if (!auth || !config.googleSheetsSpreadsheetId) {
        console.warn('[validate-guest] Google Sheets not configured, running in demo mode')
        return {
            valid: true,
            row: 2,
            alreadyCheckedIn: false,
        }
    }

    try {
        const sheets = google.sheets({ version: 'v4', auth })

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: config.googleSheetsSpreadsheetId,
            range: 'Sheet1!A:C',
        })

        const rows = response.data.values || []

        for (let i = 1; i < rows.length; i++) {
            const rowName = (rows[i][0] || '').trim().toLowerCase()
            const rowPhone = (rows[i][1] || '').trim()
            const rowHadir = (rows[i][2] || '').trim().toUpperCase()

            if (rowName === name.trim().toLowerCase() && rowPhone === phone.trim()) {
                return {
                    valid: true,
                    row: i + 1,
                    alreadyCheckedIn: rowHadir === 'TRUE' || rowHadir === 'YA' || rowHadir === '✓',
                }
            }
        }

        return {
            valid: false,
            row: null,
            alreadyCheckedIn: false,
        }
    } catch (error: any) {
        console.error('[validate-guest] Error:', error.message || error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Gagal mengakses data tamu',
        })
    }
})
