const store = require('../../store')

const calcVolume = (exchange, symbol, count) => {
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

  // Calculate the average Volume from historical data
  const averageVolInCurr =
    filteredHistoricalData.reduce(
      (sum, data) => sum + parseFloat(data.volInCurr),
      0
    ) / count

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
