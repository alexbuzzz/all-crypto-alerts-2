const axios = require('axios')
const store = require('../../store')

const getSymbols = async () => {
  try {
    const apiUrl = 'https://contract.mexc.com/api/v1/contract/ticker'
    const response = await axios.get(apiUrl)

    if (response.data.success) {
      response.data.data.forEach((element) => {
        if (!store.currentData.mexc.hasOwnProperty(element.symbol) && element.symbol.includes('USDT')) {
          store.currentData.mexc[element.symbol] = {}
        }
      })
    } else {
      console.error('Request was not successful')
    }

    return
  } catch (e) {
    console.error('request failed: ', e)
  }
}

module.exports = getSymbols
