const fs = require('fs')
const cron = require('node-cron')
const JSONdb = require('simple-json-db')
const telegramBot = require('./src/telegram/bot')
const getBybitSymbols = require('./src/bybit/getSymbols')
const bybitKlineStream = require('./src/bybit/klineStream')
const bybitOiStream = require('./src/bybit/oiStream')
const getOKXSymbols = require('./src/okx/getSymbols')
const okxOiStream = require('./src/okx/oiStream')
const okxKlineStream = require('./src/okx/klineStream')
const getMexcSymbols = require('./src/mexc/getSymbols')
const mexcKlineStream = require('./src/mexc/klineStream')
const collectCandles = require('./src/engine/collectCandles')
const store = require('./store')

// Create DB folder if not exists
const dbFolderPath = 'database'
if (!fs.existsSync(dbFolderPath)) {
  fs.mkdirSync(dbFolderPath)
}

const marketDataDb = new JSONdb('database/marketData.json')

// Pull data from DB to store if pause was less than minute
const currentTime = Date.now()
const marketData = marketDataDb.get('data')
if (currentTime - marketData.lastUpdateTime <= 60000) {
  store.marketData = marketData
}

// Save store data in DB by CRON
cron.schedule('*/5 * * * * *', () => {
  marketDataDb.set('data', store.marketData)
})

const start = async () => {
  await getBybitSymbols()
  await getOKXSymbols()
  await getMexcSymbols()
  bybitKlineStream.start()
  bybitOiStream.start()
  okxOiStream.start()
  okxKlineStream.start()
  mexcKlineStream.start()
  setTimeout(() => {
    collectCandles.start()
  }, 15 * 1000) // Give time to all websockets start
}

const stop = () => {
  bybitKlineStream.stop()
  bybitOiStream.stop()
  okxOiStream.stop()
  okxKlineStream.stop()
  mexcKlineStream.stop()
  collectCandles.stop()
}

// Restart all every 30 min to get new listed instruments data
cron.schedule('0 */30 * * *', () => {
  stop()

  setTimeout(() => {
    start()
  }, 10000)
})

// Init start
start()

// Start the Telegram bot
telegramBot.launch()
