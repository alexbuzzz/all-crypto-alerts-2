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
  const tickersList = symbols.map((item) => `kline.1.${item}`)

  wsClient.subscribeV5(tickersList, 'linear')

  // Raw data will arrive on the 'update' event
  wsClient.on('update', (data) => {
    const vol = data.data[0].volume
    const symbol = data.topic.slice(8)
    const candleTime = data.data[0].start
    const open = data.data[0].open
    const close = data.data[0].close
    const high = data.data[0].high
    const low = data.data[0].low
    const volInCurr = Math.round((parseFloat(close) * parseFloat(vol)) / 1000)

    if (store.currentData.bybit.hasOwnProperty(symbol)) {
      store.currentData.bybit[symbol].volInCurr = volInCurr
      store.currentData.bybit[symbol].openPrice = open
      store.currentData.bybit[symbol].closePrice = close
      store.currentData.bybit[symbol].highPrice = high
      store.currentData.bybit[symbol].lowPrice = low
      store.currentData.bybit[symbol].candleTime = candleTime
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
