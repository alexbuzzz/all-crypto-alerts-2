const { WebsocketClient } = require('bybit-api')
const store = require('../../store')

let wsClient = null

const start = () => {
  const wsConfig = {
    market: 'v5',
    pongTimeout: 1000,
    pingInterval: 60000,
    reconnectTimeout: 60000,
  }

  wsClient = new WebsocketClient(wsConfig)

  const symbols = Object.keys(store.currentData.bybit)
  const tickersList = symbols.map((item) => `tickers.${item}`)

  wsClient.subscribeV5(tickersList, 'linear')

  // Raw data will arrive on the 'update' event
  wsClient.on('update', (data) => {
    if (data.data.openInterest) {
      const symbol = data.data.symbol
      const oi = data.data.openInterest

      if (store.currentData.bybit.hasOwnProperty(symbol)) {
        store.currentData.bybit[symbol].oi = oi
      }
    }
  })

  wsClient.on('open', (data) => {
    console.log('ws connection opened open:', data.wsKey)
  })

  wsClient.on('reconnect', ({ wsKey }) => {
    console.log('ws automatically reconnecting.... ', wsKey)
  })
  wsClient.on('reconnected', (data) => {
    console.log('ws has reconnected ', data?.wsKey)
  })
  wsClient.on('error', (data) => {
    console.error('ws exception: ', data)
  })
}

const stop = () => {
  wsClient.close()
}

module.exports = { start, stop }
