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
const telegramAlerts = require('./src/engine/telegramAlerts')
const wsAlerts = require('./src/engine/wsAlerts')
const wsServer = require('./src/engine/wsServer')

const store = require('./store')

const dbFolderPath = 'database'
const dataFilePath = path.join(dbFolderPath, 'marketData.json')

const marketDataDb = new JSONdb('database/marketData.json')
const userDataDb = new JSONdb('database/userData.json')
const appSettingsDb = new JSONdb('database/appSettings.json')

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

// Pull user settings from DB
const users = userDataDb.get('users')
if (users) {
  store.users = users
}

// Pull message IDs from DB
const messageIDs = appSettingsDb.get('messageIDs')
if (messageIDs) {
  store.messageIDs = messageIDs
}

// Pull last alers times from DB
const lastAlertTimes = appSettingsDb.get('lastAlertTimes')
if (lastAlertTimes) {
  store.lastAlertTimes = lastAlertTimes
}

// Pull last alers WS times from DB
const lastAlertTimesWS = appSettingsDb.get('lastAlertTimesWS')
if (lastAlertTimesWS) {
  store.lastAlertTimesWS = lastAlertTimesWS
}

// Save store data in DB by CRON
cron.schedule('*/10 * * * * *', () => {
  marketDataDb.set('data', store.marketData)
  userDataDb.set('users', store.users)
  appSettingsDb.set('messageIDs', store.messageIDs)
  appSettingsDb.set('lastAlertTimes', store.lastAlertTimes)
  appSettingsDb.set('lastAlertTimesWS', store.lastAlertTimesWS)
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
  wsServer.start()
  setTimeout(() => {
    telegramAlerts.start()
    wsAlerts.start()
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
  telegramAlerts.stop()
  wsAlerts.stop()
}

// Restart all every 60 min to get new listed instruments data
cron.schedule('1,31 * * * *', () => {
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
