require('dotenv').config()
const axios = require('axios')
const store = require('../../store')

const getSymbols = async () => {
  const exceptions = process.env.EXCEPTIONS
    ? process.env.EXCEPTIONS.split(',')
    : []

  try {
    const apiUrl = 'https://fapi.binance.com/fapi/v1/exchangeInfo'
    const response = await axios.get(apiUrl)

    if (response.status == 200) {
      const responseData = response.data.symbols
      if (Array.isArray(responseData)) {
        responseData.forEach((element) => {
          if (
            !store.currentData.binance.hasOwnProperty(element.symbol) &&
            element.symbol.includes('USDT') &&
            !element.symbol.includes('_') &&
            !exceptions.includes(element.symbol)
          ) {
            store.currentData.binance[element.symbol] = {}
          }
        })
      } else {
        console.error('Response data is not an array')
      }
    } else {
      console.error('Request was not successful')
    }

    return
  } catch (e) {
    console.error('Request failed: ', e)
  }
}

module.exports = getSymbols
