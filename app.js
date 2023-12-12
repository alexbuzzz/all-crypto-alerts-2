const fs = require('fs')
const telegramBot = require('./src/telegram/bot')
const okxOiStream = require('./src/okx/oiStream')
const okxKlineStream = require('./src/okx/klineStream')
const getOKXSymbols = require('./src/okx/getSymbols')
const getMexcSymbols = require('./src/mexc/getSymbols')
const mexcKlineStream = require('./src/mexc/klineStream')
const store = require('./store')

// Create DB folder if not exists
const dbFolderPath = 'database'
if (!fs.existsSync(dbFolderPath)) {
  fs.mkdirSync(dbFolderPath)
}

// Pull data from DB to store

// Save store data in DB by CRON

// Start OKX OI stream

setInterval(() => {
  console.log(JSON.stringify(store, null, 2))
}, 5000)

const start = async () => {
  // await getOKXSymbols()
  await getMexcSymbols()
  // okxOiStream()
  // okxKlineStream()
  mexcKlineStream()
}

start()

// Start the Telegram bot
telegramBot.launch()
