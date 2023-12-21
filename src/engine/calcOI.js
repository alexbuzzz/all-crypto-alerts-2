const store = require('../../store')

const calcOI = (exchange, symbol, count) => {
  // Check if the specified exchange and symbol exist in the store
  if (!store.marketData[exchange] || !store.marketData[exchange][symbol]) {
    return 0
  }

  const historicalData = store.marketData[exchange][symbol].historicalData

  // Use the last 'count' items from historical data
  const filteredHistoricalData = historicalData.slice(-count)

  if (filteredHistoricalData.length < count) {
    return 0
  }

  // Filter out items without oi
  const validHistoricalData = filteredHistoricalData.filter(
    (data) => data.oi != undefined
  )

  // Check if there are no valid items with oi
  if (validHistoricalData.length === 0) {
    return 0
  }

  // Calculate the average OI from historical data
  const averageOI =
    validHistoricalData.reduce((sum, data) => sum + parseFloat(data.oi), 0) /
    validHistoricalData.length

  // Get the current data
  const currentData = store.marketData[exchange][symbol].currentData
  const currentOI = parseFloat(currentData.oi)

  // Calculate the percentage difference
  const percentageDifference =
    averageOI !== 0
      ? (((currentOI - averageOI) / averageOI) * 100).toFixed(1)
      : 0

  return parseFloat(percentageDifference)
}

module.exports = calcOI
