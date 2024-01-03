const WebSocket = require('ws')
const store = require('../../store')

let wsClient = null
let pingInterval

const start = () => {
  const symbols = Object.keys(store.currentData.okx)
  const wsEndpoint = 'wss://ws.okx.com:8443/ws/v5/public'

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

      console.log('OKX OI opened')

      pingInterval = setInterval(() => {
        sendPing()
      }, 20000)
    })

    wsClient.on('message', (data) => {
      const message = JSON.parse(data)

      try {
        if (message.data && message.data[0]) {
          const symbol = message.arg.instId
          const oi = message.data[0].oi

          if (store.currentData.okx.hasOwnProperty(symbol)) {
            store.currentData.okx[symbol].oi = oi
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
      console.log('OKX OI closed')
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
      args: [
        {
          channel: 'open-interest',
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
