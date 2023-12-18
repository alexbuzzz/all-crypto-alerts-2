const { WebsocketClient } = require('okx-api')
const store = require('../../store')

let wsClient = null

const start = () => {
  wsClient = new WebsocketClient()

  const symbols = Object.keys(store.currentData.okx)

  const subscribeArray = symbols.map((instId) => ({
    channel: 'candle1m',
    instId: instId,
  }))

  wsClient.subscribe(subscribeArray)

  // Raw data will arrive on the 'update' event
  wsClient.on('update', (data) => {
    const open = data.data[0][1]
    const close = data.data[0][4]
    const high = data.data[0][2]
    const low = data.data[0][3]
    const vol = data.data[0][7]
    const volInCurr = Math.round((parseFloat(close) * parseFloat(vol)) / 1000)
    const symbol = data.arg.instId
    const candleTime = data.data[0][0]

    if (store.currentData.okx.hasOwnProperty(symbol)) {
      store.currentData.okx[symbol].volInCurr = volInCurr
      store.currentData.okx[symbol].openPrice = open
      store.currentData.okx[symbol].closePrice = close
      store.currentData.okx[symbol].highPrice = high
      store.currentData.okx[symbol].lowPrice = low
      store.currentData.okx[symbol].candleTime = candleTime
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
