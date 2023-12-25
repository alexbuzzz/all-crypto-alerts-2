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
const sendMarketData = (
  symbol,
  exchange,
  alertType,
  oiVal,
  volBoostVal,
  candleVolVal,
  priceChangeVal
) => {
  if (wsServer && wsServer.clients) {
    wsServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            messageType: 'marketData',
            data: {
              symbol: symbol
                .replace('-SWAP', '')
                .replace('-', '')
                .replace('_', ''),
              exchange: exchange,
              alertType: alertType,
              oi: oiVal,
              volBoost: volBoostVal,
              candleVol: candleVolVal,
              priceChange: priceChangeVal,
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
