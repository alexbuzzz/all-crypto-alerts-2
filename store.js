const store = {
  messageIDs: {},

  lastAlertTimes: {},

  lastAlertTimesWS: {
    binance: {},
    bybit: {},
    okx: {},
    mexc: {},
  },

  users: {},

  marketData: {
    lastUpdateTime: 0,
    binance: {},
    bybit: {},
    okx: {},
    mexc: {},
  },

  currentData: {
    binance: {},
    bybit: {},
    okx: {},
    mexc: {},
  },
}

module.exports = store
