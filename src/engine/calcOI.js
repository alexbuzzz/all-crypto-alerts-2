const store = require('../../store')

const calcOI = (exchange, symbol, count) => {
  // Check if the specified exchange and symbol exist in the store
  if (!store.marketData[exchange] || !store.marketData[exchange][symbol]) {
    return 0
  }

  const historicalData = store.marketData[exchange][symbol].historicalData

  // Use the last 'count' items from historical data
  const filteredHistoricalData = historicalData.slice(-count)

  if (filteredHistoricalData.length < count + 1) {
    return 0
  }

  // Calculate the average OI from historical data
  const averageOI =
    filteredHistoricalData.reduce((sum, data) => sum + parseFloat(data.oi), 0) /
    count

  // Get the current data
  const currentData = store.marketData[exchange][symbol].currentData
  const currentOI = parseFloat(currentData.oi)

  // Calculate the percentage difference
  const percentageDifference = Math.round(
    ((currentOI - averageOI) / averageOI) * 100
  )

  return percentageDifference
}

module.exports = calcOI
