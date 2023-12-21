require('dotenv').config()
const axios = require('axios')
const store = require('../../store')

const getSymbols = async () => {
  const exceptions = process.env.EXCEPTIONS
    ? process.env.EXCEPTIONS.split(',')
    : []

  try {
    const apiUrl = 'https://www.okx.com/api/v5/public/instruments?instType=SWAP'
    const response = await axios.get(apiUrl)

    if (response.status == 200) {
      const responseData = response.data.data
      if (Array.isArray(responseData)) {
        responseData.forEach((element) => {
          if (
            !store.currentData.okx.hasOwnProperty(element.instId) &&
            element.instId.includes('USDT') &&
            !exceptions.includes(element.symbol)
          ) {
            store.currentData.okx[element.instId] = {}
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
