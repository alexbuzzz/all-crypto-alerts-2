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
    const resOI_1min = calcOI(exchange, symbol, 1)
    const resOI_5min = calcOI(exchange, symbol, 5)
    const resVolBoost_100min = calcVolumeBoost(exchange, symbol, 100)
    const resVolBoost_20min = calcVolumeBoost(exchange, symbol, 20)
    const resPrice = calcPrice(exchange, symbol)
    let candleVol =
      store.marketData[exchange] && store.marketData[exchange][symbol] && store.marketData[exchange][symbol].currentData && store.marketData[exchange][symbol].currentData.volInCurr
        ? store.marketData[exchange][symbol].currentData.volInCurr
        : 0

    // Check and initialize symbol if needed
    if (!store.lastAlertTimesWS[exchange][symbol]) {
      store.lastAlertTimesWS[exchange][symbol] = {}
    }

    // OI 1 MIN =============================================================
    if (
      Math.abs(resOI_1min) >= 1 &&
      candleVol >= process.env.DEFAULT_WS_VOL_FILTER &&
      (!store.lastAlertTimesWS[exchange][symbol]['oi1'] || currentTime - store.lastAlertTimesWS[exchange][symbol]['oi1'] >= process.env.ALERT_SUSPEND_MINUTES * 60 * 1000)
    ) {
      wsServer.sendMarketData(symbol, exchange, 'oi1', resOI_1min, resVolBoost_100min, candleVol, resPrice)
      store.lastAlertTimesWS[exchange][symbol]['oi1'] = currentTime
    }

    // OI 5 MIN =============================================================
    if (
      Math.abs(resOI_5min) >= 1 &&
      candleVol >= process.env.DEFAULT_WS_VOL_FILTER &&
      (!store.lastAlertTimesWS[exchange][symbol]['oi5'] || currentTime - store.lastAlertTimesWS[exchange][symbol]['oi5'] >= process.env.ALERT_SUSPEND_MINUTES * 60 * 1000)
    ) {
      wsServer.sendMarketData(symbol, exchange, 'oi5', resOI_5min, resVolBoost_100min, candleVol, resPrice)
      store.lastAlertTimesWS[exchange][symbol]['oi5'] = currentTime
    }

    // VOL BOOST 100 MIN ======================================================
    if (
      resVolBoost_100min >= 5 &&
      candleVol >= process.env.DEFAULT_WS_VOL_FILTER &&
      (!store.lastAlertTimesWS[exchange][symbol]['volBoost100'] || currentTime - store.lastAlertTimesWS[exchange][symbol]['volBoost100'] >= process.env.ALERT_SUSPEND_MINUTES * 60 * 1000)
    ) {
      wsServer.sendMarketData(symbol, exchange, 'volBoost100', resOI_1min, resVolBoost_100min, candleVol, resPrice)
      store.lastAlertTimesWS[exchange][symbol]['volBoost100'] = currentTime
    }

    // VOL BOOST 20 MIN ======================================================
    if (
      resVolBoost_20min >= 5 &&
      candleVol >= process.env.DEFAULT_WS_VOL_FILTER &&
      (!store.lastAlertTimesWS[exchange][symbol]['volBoost20'] || currentTime - store.lastAlertTimesWS[exchange][symbol]['volBoost20'] >= process.env.ALERT_SUSPEND_MINUTES * 60 * 1000)
    ) {
      wsServer.sendMarketData(symbol, exchange, 'volBoost20', resOI_1min, resVolBoost_20min, candleVol, resPrice)
      store.lastAlertTimesWS[exchange][symbol]['volBoost20'] = currentTime
    }
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
