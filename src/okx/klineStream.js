const WebSocket = require('ws')
const store = require('../../store')

let wsClient = null
let pingInterval

const start = () => {
  const symbols = Object.keys(store.currentData.okx)
  const wsEndpoint = 'wss://ws.okx.com:8443/ws/v5/business'

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

      console.log('OKX KLINE opened')

      pingInterval = setInterval(() => {
        sendPing()
      }, 20000)
    })

    wsClient.on('message', (data) => {
      const message = JSON.parse(data)
      try {
        if (message.data && message.data[0]) {
          const open = message.data[0][1]
          const close = message.data[0][4]
          const high = message.data[0][2]
          const low = message.data[0][3]
          const volInCurr = Math.round(parseFloat(message.data[0][7]) / 1000)

          const symbol = message.arg.instId
          const candleTime = message.data[0][0]

          if (store.currentData.okx.hasOwnProperty(symbol)) {
            store.currentData.okx[symbol].volInCurr = volInCurr
            store.currentData.okx[symbol].openPrice = open
            store.currentData.okx[symbol].closePrice = close
            store.currentData.okx[symbol].highPrice = high
            store.currentData.okx[symbol].lowPrice = low
            store.currentData.okx[symbol].candleTime = candleTime
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
      console.log('OKX KLINE closed')
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
      args: [
        {
          channel: 'candle1m',
          instId: symbol,
        },
      ],
    }

    try {
      wsClient.send(JSON.stringify(subscribeMsg))
    } catch (error) {
      console.error('OKX subscribe error', error)
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
