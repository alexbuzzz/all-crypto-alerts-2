const axios = require('axios')
const cron = require('node-cron')
const store = require('../../store')

const binanceBaseUrl = 'https://fapi.binance.com'

// Function to make a request with axios
const makeRequest = async (symbol) => {
  try {
    const response = await axios.get(`${binanceBaseUrl}/fapi/v1/openInterest`, {
      params: { symbol },
    })

    return response.data
  } catch (error) {
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.code === -4108
    ) {
      // Ignore the specific error with code -4108
      return null
    }

    console.error(error.response?.data || error.message)
    return null
  }
}

// Get OI by CRON
const getOI = cron.schedule('15,35,55 * * * * *', async () => {
  const symbols = Object.keys(store.currentData.binance)

  try {
    const responses = await Promise.all(
      symbols.map(async (element) => makeRequest(element))
    )

    responses.forEach((response) => {
      if (response) {
        const symbol = response.symbol
        if (store.currentData.binance.hasOwnProperty(symbol)) {
          store.currentData.binance[symbol].oi = response.openInterest
        }
      }
    })
  } catch (error) {
    console.error('Error in parallel requests: ', error)
  }
})

module.exports = getOI
