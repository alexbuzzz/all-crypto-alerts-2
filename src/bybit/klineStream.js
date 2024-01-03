const WebSocket = require('ws')
const store = require('../../store')

let wsClient = null
let pingInterval

const start = () => {
  const symbols = Object.keys(store.currentData.bybit)
  const wsEndpoint = 'wss://stream.bybit.com/v5/public/linear'

  const connectWebSocket = () => {
    // Check if wsClient is already open
    if (wsClient && wsClient.readyState === WebSocket.OPEN) {
      return
    }

    wsClient = new WebSocket(wsEndpoint)

    wsClient.on('open', () => {
      symbols.forEach((symbol) => {
        subscribeKline(symbol)
      })

      console.log('BYBIT KLINE opened')

      pingInterval = setInterval(() => {
        sendPing()
      }, 20000)
    })

    wsClient.on('message', (data) => {
      const message = JSON.parse(data)

      try {
        if (message.data && message.data[0]) {
          const vol = message.data[0].volume
          const symbol = message.topic.slice(8)
          const candleTime = message.data[0].start
          const open = message.data[0].open
          const close = message.data[0].close
          const high = message.data[0].high
          const low = message.data[0].low
          const volInCurr = Math.round(
            (parseFloat(close) * parseFloat(vol)) / 1000
          )

          if (store.currentData.bybit.hasOwnProperty(symbol)) {
            store.currentData.bybit[symbol].volInCurr = volInCurr
            store.currentData.bybit[symbol].openPrice = open
            store.currentData.bybit[symbol].closePrice = close
            store.currentData.bybit[symbol].highPrice = high
            store.currentData.bybit[symbol].lowPrice = low
            store.currentData.bybit[symbol].candleTime = candleTime
          }
        }

        clearInterval(pingInterval)
        pingInterval = setInterval(() => {
          sendPing()
        }, 20000)
      } catch (error) {
        console.error(error)
      }
    })

    wsClient.on('close', () => {
      console.log('BYBIT KLINE closed')
      clearInterval(pingInterval)

      setTimeout(() => {
        connectWebSocket()
      }, 20000)
    })

    wsClient.on('error', (err) => {
      console.error('WebSocket error:', err)
      clearInterval(pingInterval)

      setTimeout(() => {
        connectWebSocket()
      }, 20000)
    })
  }

  const subscribeKline = (symbol) => {
    const subscribeMsg = {
      op: 'subscribe',
      args: [`kline.1.${symbol}`],
    }

    try {
      wsClient.send(JSON.stringify(subscribeMsg))
    } catch (error) {
      console.error('BYBIT subscribe error', error)
    }
  }

  const sendPing = () => {
    try {
      if (wsClient && wsClient.readyState === WebSocket.OPEN) {
        wsClient.send('ping')
      }
    } catch (error) {
      console.error('Error sending ping:', error)
    }
  }

  connectWebSocket()
}

const stop = () => {
  if (wsClient && wsClient.readyState === WebSocket.OPEN) {
    wsClient.close()
    clearInterval(pingInterval)
  }
}

module.exports = { start, stop }
