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
        subscribeOi(symbol)
      })

      console.log('BYBIT OI opened')

      pingInterval = setInterval(() => {
        sendPing()
      }, 20000)
    })

    wsClient.on('message', (data) => {
      try {
        const message = JSON.parse(data)
        if (message.data && message.data.openInterest) {
          const symbol = message.data.symbol
          const oi = message.data.openInterest

          if (store.currentData.bybit.hasOwnProperty(symbol)) {
            store.currentData.bybit[symbol].oi = oi
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
      console.log('BYBIT OI closed')
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

  const subscribeOi = (symbol) => {
    const subscribeMsg = {
      op: 'subscribe',
      args: [`tickers.${symbol}`],
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
