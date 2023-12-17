const { WebsocketClient } = require('binance')
const store = require('../../store')

let wsClient = null

const start = () => {
  const wsConfig = {
    beautify: true,
  }

  wsClient = new WebsocketClient(wsConfig)

  const symbols = Object.keys(store.currentData.binance)

  symbols.forEach((element) => {
    wsClient.subscribeKlines(element, '1m', 'usdm', false)
  })

  wsClient.on('message', (data) => {
    const symbol = data.s

    if (store.currentData.binance.hasOwnProperty(symbol)) {
      store.currentData.binance[symbol].volInCurr = data.k.q
      store.currentData.binance[symbol].openPrice = data.k.o
      store.currentData.binance[symbol].closePrice = data.k.c
      store.currentData.binance[symbol].highPrice = data.k.h
      store.currentData.binance[symbol].lowPrice = data.k.l
      store.currentData.binance[symbol].candleTime = data.k.t
    }
  })

  wsClient.on('open', (data) => {
    console.log('ws connection opened open:', data.wsKey)
  })

  wsClient.on('reconnecting', ({ wsKey }) => {
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
  wsClient.closeAll()
}

module.exports = { start, stop }
