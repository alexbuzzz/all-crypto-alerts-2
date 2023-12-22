const WebSocket = require('ws')

const store = require('../../store')

let ws = null
let pingInterval = null

const start = () => {
  const connectWebSocket = () => {
    // Check if wsClient is already open
    if (ws && ws.readyState === WebSocket.OPEN) {
      return
    }

    const wsUrl = 'wss://contract.mexc.com/ws'
    ws = new WebSocket(wsUrl)

    ws.on('open', () => {
      console.log('MEXC KLINE opened')

      // Set up a ping message to be sent every 20 seconds
      pingInterval = setInterval(() => {
        sendPing(ws)
      }, 20000)

      // Subscribe to all K-line channels
      subscribeToAll(ws, 'Min1')
    })

    ws.on('message', (data) => {
      const message = data.toString('utf8')

      try {
        const jsonMessage = JSON.parse(message).data

        if (jsonMessage.symbol) {
          const symbol = jsonMessage.symbol
          const volInCurr = Math.round(jsonMessage.a / 1000)
          const openPrice = jsonMessage.o
          const closePrice = jsonMessage.c
          const highPrice = jsonMessage.h
          const lowPrice = jsonMessage.l
          const candleTime = jsonMessage.t

          if (store.currentData.mexc.hasOwnProperty(symbol)) {
            store.currentData.mexc[symbol].volInCurr = volInCurr
            store.currentData.mexc[symbol].openPrice = openPrice
            store.currentData.mexc[symbol].closePrice = closePrice
            store.currentData.mexc[symbol].highPrice = highPrice
            store.currentData.mexc[symbol].lowPrice = lowPrice
            store.currentData.mexc[symbol].candleTime = candleTime
            store.currentData.mexc[symbol].oi = 0 // Temp data while MEXC is not providing OI
          }
        }
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    })

    ws.on('error', (error) => {
      console.error('WebSocket error:', error)
    })

    ws.on('close', () => {
      console.log('MEXC KLINE closed')
      clearInterval(pingInterval)
      unsubscribeFromAll(ws)
      setTimeout(connectWebSocket, 20000) // Reconnect after 20 seconds
    })
  }

  // Function to send a ping message
  const sendPing = (ws) => {
    const pingMsg = JSON.stringify({
      method: 'ping',
    })
    ws.send(pingMsg)
  }

  // Function to subscribe to the K-line channel
  const subscribeToKline = (ws, symbol, interval) => {
    const subscribeMsg = JSON.stringify({
      method: 'sub.kline',
      param: {
        symbol,
        interval,
      },
    })
    ws.send(subscribeMsg)
  }

  // Function to unsubscribe from all channels
  const unsubscribeFromAll = (ws) => {
    const symbols = Object.keys(store.currentData.mexc)
    symbols.forEach((symbol) => {
      const unsubscribeMsg = JSON.stringify({
        method: 'unsub.kline',
        param: {
          symbol,
        },
      })
      ws.send(unsubscribeMsg)
    })
  }

  // Function to subscribe to all K-line channels
  const subscribeToAll = (ws, interval) => {
    const symbols = Object.keys(store.currentData.mexc)
    symbols.forEach((symbol) => {
      subscribeToKline(ws, symbol, interval)
    })
  }

  connectWebSocket()
}

const stop = () => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.close()
    clearInterval(pingInterval)
  }
}

module.exports = { start, stop }
