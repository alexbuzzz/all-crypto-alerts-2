const store = require('../../store')

let jobInterval = null

const start = () => {
  let tempData = JSON.parse(JSON.stringify(store.currentData)) // Initial copy

  jobInterval = setInterval(() => {
    const currentTime = Date.now()
    store.marketData.lastUpdateTime = currentTime

    const exchanges = Object.keys(store.currentData)

    exchanges.forEach((exchange) => {
      const symbols = Object.keys(store.currentData[exchange])

      symbols.forEach((symbol) => {
        const currentItem = store.currentData[exchange][symbol]
        const tempItem = tempData[exchange][symbol]

        if (currentItem.candleTime !== tempItem.candleTime) {
          if (!store.marketData[exchange][symbol]) {
            store.marketData[exchange][symbol] = {
              historicalData: [], // Initialize historicalData as an array
              currentData: {}, // Initialize currentData
            }
          }

          if (Object.keys(tempItem).length > 0) {
            // const currentDataItem = {
            //   volInCurr: tempItem.volInCurr,
            //   closePrice: tempItem.closePrice,
            //   candleTime: tempItem.candleTime,
            //   oi: tempItem.oi,
            // }

            const historicalItem = {
              volInCurr: tempItem.volInCurr,
              closePrice: tempItem.closePrice,
              candleTime: tempItem.candleTime,
              oi: tempItem.oi,
            }

            // Update the currentData with the most recent item
            store.marketData[exchange][symbol]['currentData'] = currentItem

            // Add the new item to historicalData
            store.marketData[exchange][symbol]['historicalData'].push(historicalItem)

            // Check and trim the array if it exceeds 180 items
            if (store.marketData[exchange][symbol]['historicalData'].length > 180) {
              store.marketData[exchange][symbol]['historicalData'].shift() // Remove the oldest item
            }
          }
        }
      })
    })

    tempData = JSON.parse(JSON.stringify(store.currentData))
  }, process.env.NEW_CANDLE_CHECK_INTERVAL_SEC * 1000)
}

const stop = () => {
  clearInterval(jobInterval)
}

module.exports = { start, stop }
