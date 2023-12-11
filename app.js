const fs = require('fs')
const telegramBot = require('./src/telegram/bot')

// Create DB folder if not exists
const dbFolderPath = 'database'
if (!fs.existsSync(dbFolderPath)) {
  fs.mkdirSync(dbFolderPath)
}

// Pull data from DB to store

// Save store data in DB by CRON

// Start the Telegram bot
telegramBot.launch()
