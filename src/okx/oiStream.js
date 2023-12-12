const { WebsocketClient } = require('okx-api')
const store = require('../../store')

const oiStream = () => {
  const wsClient = new WebsocketClient()

  const symbols = Object.keys(store.currentData.okx)

  const subscribeArray = symbols.map((instId) => ({
    channel: 'open-interest',
    instId: instId,
  }))

  wsClient.subscribe(subscribeArray)

  // Raw data will arrive on the 'update' event
  wsClient.on('update', (data) => {
    const symbol = data.arg.instId
    const oi = data.data[0].oi

    if (store.currentData.okx.hasOwnProperty(symbol)) {
      store.currentData.okx[symbol].oi = oi
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

module.exports = oiStream
