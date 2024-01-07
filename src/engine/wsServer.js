const WebSocket = require('ws')
const fs = require('fs')
const path = require('path')

let wsServer = null

// START WS SERVER
const start = () => {
  if (wsServer !== null) {
    return
  }

  wsServer = new WebSocket.Server({ port: 2020 })
  const logStream = fs.createWriteStream(path.join(__dirname, 'server.log'), {
    flags: 'a',
  })

  wsServer.on('connection', (socket, request) => {
    const ip = request.connection.remoteAddress
    const now = new Date()
    const timestamp = now.toISOString()
    const logMessage = `${timestamp} - New client connected with IP: ${ip}\n`

    // Log the message to the console
    console.log(logMessage)

    // Write the message to the log file
    logStream.write(logMessage)

    // Message received
    socket.on('message', (data) => {
      handleReceivedWsMessage(socket, data)
    })
  })
}

// SEND MARKET DATA MESSAGE
const sendMarketData = (symbol, exchange, resOI_1, resOI_5, resOI_15, resOI_30, resOI_60, resVolBoost_1, resVolBoost_5, resVolBoost_15, resVolBoost_30, resVolBoost_60, candleVol, resPrice) => {
  if (wsServer && wsServer.clients) {
    wsServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            messageType: 'marketData',
            data: {
              symbol: symbol.replace('-SWAP', '').replace('-', '').replace('_', ''),
              exchange: exchange,
              oi_1: resOI_1,
              oi_5: resOI_5,
              oi_15: resOI_15,
              oi_30: resOI_30,
              oi_60: resOI_60,
              volBoost_1: resVolBoost_1,
              volBoost_5: resVolBoost_5,
              volBoost_15: resVolBoost_15,
              volBoost_30: resVolBoost_30,
              volBoost_60: resVolBoost_60,
              candleVol: candleVol,
              priceChange: resPrice,
            },
          })
        )
      }
    })
  }
}

// Handle received WebSocket message
const handleReceivedWsMessage = (socket, data) => {
  // Check for "ping" message
  const msg = JSON.parse(data)
  if (msg.messageType === 'ping') {
    // Respond with a "pong" message
    setTimeout(() => {
      socket.send(JSON.stringify({ messageType: 'pong' }))
    }, 1000)
  }
}

module.exports = { start, sendMarketData }
