const WebSocket = require('ws')
const store = require('../../store')

let wsClient1 = null
let wsClient2 = null
let streams1
let streams2

const start = () => {
  const symbols = Object.keys(store.currentData.binance)

  if (symbols.length < 200) {
    streams1 = symbols.map((symbol) => `${symbol.toLowerCase()}@kline_1m`)
    const wsEndpoint1 =
      'wss://fstream.binance.com/stream?streams=' + streams1.join('/')

    connectWebSocket1(wsEndpoint1)
  } else {
    const first200Symbols = symbols.slice(0, 200)
    const restOfSymbols = symbols.slice(200)

    streams1 = first200Symbols.map(
      (symbol) => `${symbol.toLowerCase()}@kline_1m`
    )
    streams2 = restOfSymbols.map((symbol) => `${symbol.toLowerCase()}@kline_1m`)

    const wsEndpoint1 =
      'wss://fstream.binance.com/stream?streams=' + streams1.join('/')
    const wsEndpoint2 =
      'wss://fstream.binance.com/stream?streams=' + streams2.join('/')

    connectWebSocket1(wsEndpoint1)
    connectWebSocket2(wsEndpoint2)
  }
}

const connectWebSocket1 = (wsEndpoint) => {
  // Check if wsClient1 is already open
  if (wsClient1 && wsClient1.readyState === WebSocket.OPEN) {
    return
  }

  wsClient1 = new WebSocket(wsEndpoint)

  wsClient1.on('open', () => {
    console.log('BINANCE KLINE 1 opened')
  })

  wsClient1.on('message', (data) => {
    const message = JSON.parse(data)

    try {
      if (message && message.data) {
        const symbol = message.data.s

        if (store.currentData.binance.hasOwnProperty(symbol)) {
          store.currentData.binance[symbol].volInCurr = Math.round(
            parseFloat(message.data.k.q) / 1000
          )
          store.currentData.binance[symbol].openPrice = message.data.k.o
          store.currentData.binance[symbol].closePrice = message.data.k.c
          store.currentData.binance[symbol].highPrice = message.data.k.h
          store.currentData.binance[symbol].lowPrice = message.data.k.l
          store.currentData.binance[symbol].candleTime = message.data.k.t
        }
      }
    } catch (error) {
      console.error(error)
    }
  })

  wsClient1.on('close', () => {
    console.log('BINANCE KLINE 1 closed')

    setTimeout(() => {
      connectWebSocket1(wsEndpoint)
    }, 20000)
  })

  wsClient1.on('error', (err) => {
    console.error('WebSocket error:', err)

    setTimeout(() => {
      connectWebSocket1(wsEndpoint)
    }, 20000)
  })
}

const connectWebSocket2 = (wsEndpoint) => {
  // Check if wsClient2 is already open
  if (wsClient2 && wsClient2.readyState === WebSocket.OPEN) {
    return
  }

  wsClient2 = new WebSocket(wsEndpoint)

  wsClient2.on('open', () => {
    console.log('BINANCE KLINE 2 opened')
  })

  wsClient2.on('message', (data) => {
    const message = JSON.parse(data)

    try {
      if (message && message.data) {
        const symbol = message.data.s

        if (store.currentData.binance.hasOwnProperty(symbol)) {
          store.currentData.binance[symbol].volInCurr = Math.round(
            parseFloat(message.data.k.q) / 1000
          )
          store.currentData.binance[symbol].openPrice = message.data.k.o
          store.currentData.binance[symbol].closePrice = message.data.k.c
          store.currentData.binance[symbol].highPrice = message.data.k.h
          store.currentData.binance[symbol].lowPrice = message.data.k.l
          store.currentData.binance[symbol].candleTime = message.data.k.t
        }
      }
    } catch (error) {
      console.error(error)
    }
  })

  wsClient2.on('close', () => {
    console.log('BINANCE KLINE 2 closed')

    setTimeout(() => {
      connectWebSocket2(wsEndpoint)
    }, 20000)
  })

  wsClient2.on('error', (err) => {
    console.error('WebSocket error:', err)

    setTimeout(() => {
      connectWebSocket2(wsEndpoint)
    }, 20000)
  })
}

const stop = () => {
  if (wsClient1 && wsClient1.readyState === WebSocket.OPEN) {
    wsClient1.close()
  }
  if (wsClient2 && wsClient2.readyState === WebSocket.OPEN) {
    wsClient2.close()
  }
}

module.exports = { start, stop }
