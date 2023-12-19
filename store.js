const store = {
  messageIDs: {},

  lastAlertTimes: {},

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
