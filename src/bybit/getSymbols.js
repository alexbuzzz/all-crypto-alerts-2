const { RestClientV5 } = require('bybit-api')
const store = require('../../store')

const getSymbols = async () => {
  const client = new RestClientV5({
    testnet: true,
  })

  try {
    const response = await client.getInstrumentsInfo({
      category: 'linear',
    })
    response.result.list.forEach((element) => {
      if (!store.currentData.bybit.hasOwnProperty(element.symbol) && element.symbol.includes('USDT')) {
        store.currentData.bybit[element.symbol] = {}
      }
    })

    return
  } catch (e) {
    console.error('request failed: ', e)
  }
}

module.exports = getSymbols
