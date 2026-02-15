// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],

  app: {
    head: {
      title: 'Undangan Pernikahan - Ahmad & Siti',
      meta: [
        { name: 'description', content: 'Undangan Pernikahan Digital Ahmad Fauzan & Siti Nurhaliza' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  runtimeConfig: {
    googleSheetsPrivateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY || '',
    googleSheetsClientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL || '',
    googleSheetsSpreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID || '',
  },
})