import { google } from 'googleapis'

function parsePrivateKey(key: string): string {
    let parsed = key.trim()

    if ((parsed.startsWith('"') && parsed.endsWith('"')) ||
        (parsed.startsWith("'") && parsed.endsWith("'"))) {
        parsed = parsed.slice(1, -1)
    }

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
    const { row } = body

    if (!row) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Row number harus diisi',
        })
    }

    const config = useRuntimeConfig()
    const auth = getAuth()

    if (!auth || !config.googleSheetsSpreadsheetId) {
        console.warn('[checkin-guest] Google Sheets not configured, running in demo mode')
        return { success: true }
    }

    try {
        const sheets = google.sheets({ version: 'v4', auth })

        await sheets.spreadsheets.values.update({
            spreadsheetId: config.googleSheetsSpreadsheetId,
            range: `Sheet1!C${row}`,
            valueInputOption: 'RAW',
            requestBody: {
                values: [['TRUE']],
            },
        })

        return { success: true }
    } catch (error: any) {
        console.error('[checkin-guest] Error:', error.message || error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Gagal melakukan check-in tamu',
        })
    }
})
