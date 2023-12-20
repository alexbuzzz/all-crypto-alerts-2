const store = require('../../store')

const calcVolume = (exchange, symbol, count) => {
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

  // Filter out items without volInCurr
  const validHistoricalData = filteredHistoricalData.filter(
    (data) => data.volInCurr !== undefined
  )

  // Check if there are no valid items with volInCurr
  if (validHistoricalData.length === 0) {
    return 0
  }

  // Calculate the average Volume from historical data
  const averageVolInCurr =
    validHistoricalData.reduce(
      (sum, data) => sum + parseFloat(data.volInCurr),
      0
    ) / validHistoricalData.length

  // Get the current data
  const currentData = store.marketData[exchange][symbol].currentData
  const currentVolume = parseFloat(currentData.volInCurr)

  // Calculate how many times difference (x)
  const percentageDifference = Math.round(
    (currentVolume - averageVolInCurr) / averageVolInCurr
  )

  return percentageDifference
}

module.exports = calcVolume
