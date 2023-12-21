require('dotenv').config()
const { Telegraf } = require('telegraf')
const store = require('../../store')
const calcOI = require('./calcOI')
const calcVolumeBoost = require('./calcVolumeBoost')
const calcPrice = require('./calcPrice')

const bot = new Telegraf(process.env.BOT_TOKEN)

let alertInterval = null

const sendMessage = async (
  userId,
  symbol,
  alertType,
  headerVal,
  headerPeriod,
  exchange,
  oiVal,
  volBoostVal,
  volVal,
  priceVal
) => {
  let exchangeFormated = ''

  switch (exchange) {
    case 'binance':
      exchangeFormated = '🟡 Binance'
      break
    case 'bybit':
      exchangeFormated = '🟠 Bybit'
      break
    case 'okx':
      exchangeFormated = '⚪️ OKX'
      break
    case 'mexc':
      exchangeFormated = '🔵 MEXC'
      break
  }

  const messageText = `<strong>${alertType}</strong> (${headerVal} / ${headerPeriod})\n${exchangeFormated} <code>${symbol
    .replace('-', '')
    .replace('_', '')
    .replace('-SWAP', '')}</code>\n${
    oiVal >= process.env.OI_HIGHTLIGHT ? '🔥' : '➖'
  } OI ${oiVal}%\n${
    volBoostVal >= process.env.VOLUME_BOOST_HIGHTLIGHT ? '🔥' : '➖'
  } Vol Boost ${volBoostVal}x\n${
    volVal >= process.env.VOL_IN_CURRENCY_HIGHTLIGHT ? '🔥' : '➖'
  } Vol ${volVal}K ($)\n${
    priceVal >= process.env.PRICE_CHANGE_HIGHTLIGHT ? '🔥' : '➖'
  } Price ${priceVal}%`

  try {
    await bot.telegram.sendMessage(userId, messageText, {
      parse_mode: 'HTML',
    })
  } catch (error) {
    if (error.response && error.response.error_code === 403) {
      // console.error(`User has blocked the bot for chat_id: ${userId}`)
    } else {
      console.error('Error sending message:', error)
    }
  }
}

const fireAlert = (exchange) => {
  const symbols = Object.keys(store.currentData[exchange])

  symbols.forEach((symbol) => {
    const currentTime = Date.now()
    const resOI_1min = calcOI(exchange, symbol, 1)
    const resOI_5min = calcOI(exchange, symbol, 5)
    const resVolBoost_100min = calcVolumeBoost(exchange, symbol, 10) // Переправити на 100
    const resPrice = calcPrice(exchange, symbol)
    let candleVol =
      store.marketData[exchange] &&
      store.marketData[exchange][symbol] &&
      store.marketData[exchange][symbol].currentData &&
      store.marketData[exchange][symbol].currentData.volInCurr
        ? store.marketData[exchange][symbol].currentData.volInCurr
        : 0

    const users = Object.keys(store.users)

    users.forEach((userId) => {
      // Check and initialize if needed
      if (!store.lastAlertTimes[userId]) {
        store.lastAlertTimes[userId] = {}
      }

      // Check and initialize exchange if needed
      if (!store.lastAlertTimes[userId][exchange]) {
        store.lastAlertTimes[userId][exchange] = {}
      }

      // Check and initialize symbol if needed
      if (!store.lastAlertTimes[userId][exchange][symbol]) {
        store.lastAlertTimes[userId][exchange][symbol] = {}
      }

      // OI SETUP 1
      if (
        store.users[userId][exchange].oiSetup1 &&
        Math.abs(resOI_1min) >= 1.5 &&
        candleVol >= process.env.VOL_IN_CURRENCY_FILTER &&
        (!store.lastAlertTimes[userId][exchange][symbol]['oiSetup1'] ||
          currentTime -
            store.lastAlertTimes[userId][exchange][symbol]['oiSetup1'] >=
            process.env.ALERT_SUSPEND_MINUTES * 60 * 1000)
      ) {
        sendMessage(
          userId,
          symbol,
          'Open Interest',
          `${resOI_1min}%`,
          '1min',
          exchange,
          resOI_1min,
          resVolBoost_100min,
          candleVol,
          resPrice
        )
        store.lastAlertTimes[userId][exchange][symbol]['oiSetup1'] = currentTime
      }

      // VOL BOOST SETUP 1
      if (
        store.users[userId][exchange].volBoostSetup1 &&
        resVolBoost_100min >= 2 &&
        candleVol >= process.env.VOL_IN_CURRENCY_FILTER &&
        (!store.lastAlertTimes[userId][exchange][symbol]['volBoostSetup1'] ||
          currentTime -
            store.lastAlertTimes[userId][exchange][symbol]['volBoostSetup1'] >=
            process.env.ALERT_SUSPEND_MINUTES * 60 * 1000)
      ) {
        sendMessage(
          userId,
          symbol,
          'Vol Boost',
          `${resVolBoost_100min}x`,
          '100min',
          exchange,
          resOI_1min,
          resVolBoost_100min,
          candleVol,
          resPrice
        )
        store.lastAlertTimes[userId][exchange][symbol]['volBoostSetup1'] =
          currentTime
      }
    })
  })
}

const start = () => {
  alertInterval = setInterval(() => {
    fireAlert('binance')
    fireAlert('bybit')
    fireAlert('okx')
    fireAlert('mexc')
  }, process.env.CALC_INTERVAL_SECONDS * 1000)
}

const stop = () => {
  clearInterval(alertInterval)
}

module.exports = { start, stop }
