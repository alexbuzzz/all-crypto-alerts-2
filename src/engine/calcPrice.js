const store = require('../../store')

const calcPrice = (exchange, symbol) => {
  // Check if the specified exchange and symbol exist in the store
  if (!store.marketData[exchange] || !store.marketData[exchange][symbol]) {
    return 0
  }

  // Get the current data
  const currentData = store.marketData[exchange][symbol].currentData
  const openPrice = parseFloat(currentData.openPrice)
  const closePrice = parseFloat(currentData.closePrice)

  // Calculate the percentage difference
  const percentageDifference = (
    ((closePrice - openPrice) / openPrice) *
    100
  ).toFixed(1)

  return parseFloat(percentageDifference)
}

module.exports = calcPrice
