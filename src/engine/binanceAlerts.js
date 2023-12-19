require('dotenv').config()
const { Telegraf } = require('telegraf')
const store = require('../../store')
const calcOI = require('./calcOI')
const calcVolumeBoost = require('./calcVolumeBoost')
const calcPrice = require('./calcPrice')

const bot = new Telegraf(process.env.BOT_TOKEN)

const start = () => {
  const sendMessage = async (
    userId,
    symbol,
    alertType,
    headerVal,
    headerPeriod,
    oiVal,
    volBoostVal,
    volVal,
    priceVal
  ) => {
    const messageText = `<strong>${alertType}</strong> (${headerVal} / ${headerPeriod})\n🟡 Binance <code>${symbol}</code>\n${
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

  const symbols = Object.keys(store.currentData.binance)

  symbols.forEach((symbol) => {
    const resOI_1min = calcOI('binance', symbol, 1)
    const resOI_5min = calcOI('binance', symbol, 5)
    const resVolBoost_100min = calcVolumeBoost('binance', symbol, 100)
    const resPrice = calcPrice('binance', symbol)
    let candleVol =
      store.marketData.binance &&
      store.marketData.binance[symbol] &&
      store.marketData.binance[symbol].currentData &&
      store.marketData.binance[symbol].currentData.volInCurr
        ? store.marketData.binance[symbol].currentData.volInCurr
        : 0

    const users = Object.keys(store.users)

    users.forEach((userId) => {
      if (symbol === 'BTCUSDT') {
        sendMessage(
          userId,
          symbol,
          'Open Interest',
          `${resOI_1min}%`,
          '1min',
          resOI_1min,
          resVolBoost_100min,
          candleVol,
          resPrice
        )
      }
    })
    // OI setup 1
  })
}

const stop = () => {
  //
}

module.exports = { start, stop }
