const { RestClient } = require('okx-api')
const store = require('../../store')

const client = new RestClient()

const getSymbols = async () => {
  try {
    const results = await client.getInstruments('SWAP')

    results.forEach((element) => {
      if (!store.currentData.okx.hasOwnProperty(element.instId) && element.instId.includes('USDT')) {
        store.currentData.okx[element.instId] = {}
      }
    })

    return
  } catch (e) {
    console.error('request failed: ', e)
  }
}

module.exports = getSymbols
