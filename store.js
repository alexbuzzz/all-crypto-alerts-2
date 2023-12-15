const store = {
  messageIDs: {},
  users: {},
  marketData: {
    lastUpdateTime: 0,
    bybit: {},
    okx: {},
    mexc: {},
  },
  currentData: {
    bybit: {},
    okx: {},
    mexc: {},
  },

  save: () => {},

  load: () => {},
}

module.exports = store
