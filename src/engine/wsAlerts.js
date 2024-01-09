require('dotenv').config()
const store = require('../../store')
const calcOI = require('./calcOI')
const calcVolumeBoost = require('./calcVolumeBoost')
const calcPrice = require('./calcPrice')
const wsServer = require('./wsServer')

let alertInterval = null

const fireAlert = (exchange) => {
  const symbols = Object.keys(store.currentData[exchange])

  symbols.forEach((symbol) => {
    const currentTime = Date.now()
    const resOI_1 = calcOI(exchange, symbol, 1)
    const resOI_5 = calcOI(exchange, symbol, 5)
    const resOI_15 = calcOI(exchange, symbol, 15)
    const resOI_30 = calcOI(exchange, symbol, 30)
    const resOI_60 = calcOI(exchange, symbol, 60)
    const resVolBoost_1 = calcVolumeBoost(exchange, symbol, 1)
    const resVolBoost_5 = calcVolumeBoost(exchange, symbol, 5)
    const resVolBoost_15 = calcVolumeBoost(exchange, symbol, 15)
    const resVolBoost_30 = calcVolumeBoost(exchange, symbol, 30)
    const resVolBoost_60 = calcVolumeBoost(exchange, symbol, 60)
    const resVolBoost_100 = calcVolumeBoost(exchange, symbol, 100)
    const resPrice = calcPrice(exchange, symbol)
    let candleVol =
      store.marketData[exchange] && store.marketData[exchange][symbol] && store.marketData[exchange][symbol].currentData && store.marketData[exchange][symbol].currentData.volInCurr
        ? store.marketData[exchange][symbol].currentData.volInCurr
        : 0

    if (
      (Math.abs(resOI_1) >= 1 ||
        Math.abs(resOI_5) >= 1 ||
        Math.abs(resOI_15) >= 1 ||
        Math.abs(resOI_30) >= 1 ||
        Math.abs(resOI_60) >= 1 ||
        resVolBoost_1 >= 5 ||
        resVolBoost_5 >= 5 ||
        resVolBoost_15 >= 5 ||
        resVolBoost_30 >= 5 ||
        resVolBoost_60 >= 5 ||
        resVolBoost_100 >= 5) &&
      candleVol >= process.env.DEFAULT_WS_VOL_FILTER &&
      (!store.lastAlertTimesWS[exchange][symbol] || currentTime - store.lastAlertTimesWS[exchange][symbol] >= process.env.ALERT_SUSPEND_SECONDS_WS * 1000)
    ) {
      wsServer.sendMarketData(
        symbol,
        exchange,
        resOI_1,
        resOI_5,
        resOI_15,
        resOI_30,
        resOI_60,
        resVolBoost_1,
        resVolBoost_5,
        resVolBoost_15,
        resVolBoost_30,
        resVolBoost_60,
        resVolBoost_100,
        candleVol,
        resPrice
      )
      store.lastAlertTimesWS[exchange][symbol] = currentTime
    }
  })
}

const start = () => {
  alertInterval = setInterval(() => {
    fireAlert('binance')
    fireAlert('bybit')
    fireAlert('okx')
    fireAlert('mexc')
  }, process.env.CALC_INTERVAL_SECONDS_WS * 1000)
}

const stop = () => {
  clearInterval(alertInterval)
}

module.exports = { start, stop }
