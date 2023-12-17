const { USDMClient } = require('binance')
const store = require('../../store')

const getSymbols = async () => {
  const client = new USDMClient()

  try {
    const symbols = []
    const response = await client.get24hrChangeStatistics()
    response.forEach((element) => {
      if (!element.symbol.includes('_') && element.symbol.includes('USDT')) {
        symbols.push({
          name: element.symbol,
          dayVol: Math.round(element.quoteVolume),
        })
      }
    })

    symbols.sort((a, b) => b.dayVol - a.dayVol)

    const allSymbols = symbols.map((item) => item.name).slice(0, 200)

    allSymbols.forEach((element) => {
      if (!store.currentData.binance.hasOwnProperty(element)) {
        store.currentData.binance[element] = {}
      }
    })

    return
  } catch (e) {
    console.error('request failed: ', e)
  }
}

module.exports = getSymbols
