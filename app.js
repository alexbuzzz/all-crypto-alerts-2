const fs = require('fs')
const path = require('path')
const cron = require('node-cron')
const JSONdb = require('simple-json-db')
const telegramBot = require('./src/telegram/bot')
const getBinanceSymbols = require('./src/binance/getSymbols')
const binanceKlineStream = require('./src/binance/klineStream')
const binanceOiStream = require('./src/binance/oiStream')
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

const dbFolderPath = 'database'
const dataFilePath = path.join(dbFolderPath, 'marketData.json')

const marketDataDb = new JSONdb('database/marketData.json')

// Create DB folder if not exists
if (!fs.existsSync(dbFolderPath)) {
  fs.mkdirSync(dbFolderPath)
}

// Pull data from DB to store if pause was less than minute
if (fs.existsSync(dataFilePath)) {
  const currentTime = Date.now()
  const marketData = marketDataDb.get('data')
  if (marketData && currentTime - marketData.lastUpdateTime <= 60 * 1000) {
    store.marketData = marketData
  }
}

// Save store data in DB by CRON
cron.schedule('*/10 * * * * *', () => {
  marketDataDb.set('data', store.marketData)
})

const start = async () => {
  await getBinanceSymbols()
  await getBybitSymbols()
  await getOKXSymbols()
  await getMexcSymbols()
  binanceKlineStream.start()
  binanceOiStream.start()
  bybitKlineStream.start()
  bybitOiStream.start()
  okxOiStream.start()
  okxKlineStream.start()
  mexcKlineStream.start()
  setTimeout(() => {
    collectCandles.start()
  }, 10 * 1000) // Give time to all websockets start
}

const stop = () => {
  binanceKlineStream.stop()
  binanceOiStream.stop()
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

  // Give time to all websockets stop
  setTimeout(() => {
    start()
  }, 10000)
})

// Init start
start()

// Start the Telegram bot
telegramBot.launch()
