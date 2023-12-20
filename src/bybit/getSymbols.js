const axios = require('axios')
const store = require('../../store')

const getSymbols = async () => {
  try {
    const apiUrl =
      'https://api.bybit.com/v5/market/instruments-info?category=linear'
    const response = await axios.get(apiUrl)

    if (response.status == 200) {
      const responseData = response.data.result.list
      if (Array.isArray(responseData)) {
        responseData.forEach((element) => {
          if (
            !store.currentData.bybit.hasOwnProperty(element.symbol) &&
            element.symbol.includes('USDT')
          ) {
            store.currentData.bybit[element.symbol] = {}
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
