require('dotenv').config()
const fs = require('fs')
const { RestClientV5, WebsocketClient } = require('bybit-api')
const JSONdb = require('simple-json-db')
const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

const allSymbols = []
const tempOI = {}
let mainOIObj = {}
let volume1m = {}
let lastAlertTimes = {
  setup1: {},
  setup2: {},
  setup3: {},
  setup4: {},
  setup5: {},
}

let OISocket = null
let klineSocket = null

class Bybit {
  // PULL DATA FROM DB
  async pullDataFromDB() {
    const db = new JSONdb('database/bybit.json')

    // Check if "bybit" contains openInterest
    if (!db.has('openInterest')) {
      db.set('openInterest', {})
    } else {
      mainOIObj = db.get('openInterest')
    }

    // Check if "bybit" contains lastAlertTimes
    if (!db.has('lastAlertTimes')) {
      db.set('lastAlertTimes', {
        setup1: {},
        setup2: {},
        setup3: {},
        setup4: {},
        setup5: {},
      })
    } else {
      lastAlertTimes = db.get('lastAlertTimes')
    }
  }

  // GET ALL SYMBOLS
  async getSymbols() {
    const client = new RestClientV5({
      testnet: true,
    })

    try {
      const response = await client.getInstrumentsInfo({
        category: 'linear',
      })
      response.result.list.forEach((element) => {
        if (element.symbol.includes('USDT')) {
          allSymbols.push(element.symbol)
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  // START OPEN INTEREST STREAM
  startOIStream() {
    const wsConfig = {
      market: 'v5',
      pongTimeout: 1000,
      pingInterval: 60000,
      reconnectTimeout: 60000,
    }

    OISocket = new WebsocketClient(wsConfig)

    const tickersList = allSymbols.map((item) => `tickers.${item}`)

    OISocket.subscribeV5(tickersList, 'linear')

    OISocket.on('update', (data) => {
      if (data.data.openInterest) {
        tempOI[data.data.symbol] = data.data.openInterest
      }
    })

    OISocket.on('close', () => {
      console.log('OI connection closed')
    })

    OISocket.on('error', (err) => {
      console.error('error', err)
    })
  }

  // STOP OPEN INTEREST STREAM
  stopOIStream() {
    if (OISocket) {
      OISocket.close()
      OISocket.removeAllListeners('update')
      OISocket.removeAllListeners('close')
      OISocket.removeAllListeners('error')
    }
  }

  // START KLINE STREAM
  startKlineStream() {
    const wsConfig = {
      market: 'v5',
      pongTimeout: 1000,
      pingInterval: 60000,
      reconnectTimeout: 60000,
    }

    klineSocket = new WebsocketClient(wsConfig)

    const tickersList = allSymbols.map((item) => `kline.1.${item}`)

    klineSocket.subscribeV5(tickersList, 'linear')

    klineSocket.on('update', (data) => {
      if (parseFloat(data.data[0].volume) > 0) {
        volume1m[data.topic.slice(8)] = parseFloat(data.data[0].close) * parseFloat(data.data[0].volume)
      }
    })

    klineSocket.on('close', () => {
      console.log('kline connection closed')
    })

    klineSocket.on('error', (err) => {
      console.error('error', err)
    })
  }

  // STOP KLINE STREAM
  stopKlineStream() {
    if (klineSocket) {
      klineSocket.close()
      klineSocket.removeAllListeners('update')
      klineSocket.removeAllListeners('close')
      klineSocket.removeAllListeners('error')
    }
  }

  // SAVE CURRENT OI TO MAIN OBJ AND DB
  saveCurrentOI() {
    Object.keys(tempOI).forEach((key) => {
      const timestamp = new Date().toISOString()

      if (!mainOIObj[key]) {
        mainOIObj[key] = []
      }

      mainOIObj[key].unshift({
        oi: parseFloat(tempOI[key]),
        ts: timestamp,
      })

      // Trim the array if its length exceeds 180
      if (mainOIObj[key].length > 180) {
        mainOIObj[key].splice(180)
      }
    })

    // Save to DB
    const db = new JSONdb('database/bybit.json')
    db.set('openInterest', mainOIObj)
  }

  // SAVE LAST ALERT TIMES TO DB
  saveLastAlertTimes() {
    const db = new JSONdb('database/bybit.json')
    db.set('lastAlertTimes', lastAlertTimes)
  }

  // CALCULATE OI PERCENTAGE
  calcOIPercentage() {
    Object.keys(tempOI).forEach((key) => {
      // Check if the key exists in mainOIObj
      if (mainOIObj.hasOwnProperty(key)) {
        const array = mainOIObj[key]
        const tempOIValue = parseFloat(tempOI[key])

        if (array.length > 0) {
          // Setup 1 (10 min / 5%)
          const limitedArray1 = array.slice(0, Math.min(10, array.length))
          const minOI1 = Math.min(...limitedArray1.map((item) => item.oi))
          const percentage1 = ((tempOIValue - minOI1) / minOI1) * 100
          if (percentage1 > 5) {
            this.fireOIAlert('setup1', key, percentage1)
            lastAlertTimes.setup1[key] = Date.now()
          }

          // Setup 2 (60 min / 10%)
          const limitedArray2 = array.slice(0, Math.min(60, array.length))
          const minOI2 = Math.min(...limitedArray2.map((item) => item.oi))
          const percentage2 = ((tempOIValue - minOI2) / minOI2) * 100
          if (percentage2 > 10) {
            this.fireOIAlert('setup2', key, percentage2)
            lastAlertTimes.setup2[key] = Date.now()
          }

          // Setup 3 (180 min / 20%)
          const limitedArray3 = array.slice(0, Math.min(180, array.length))
          const minOI3 = Math.min(...limitedArray3.map((item) => item.oi))
          const percentage3 = ((tempOIValue - minOI3) / minOI3) * 100
          if (percentage3 > 20) {
            this.fireOIAlert('setup3', key, percentage3)
            lastAlertTimes.setup3[key] = Date.now()
          }

          // Setup 4 (1 min / 3%)
          const limitedArray4 = array.slice(0, Math.min(1, array.length))
          const minOI4 = Math.min(...limitedArray4.map((item) => item.oi))
          const percentage4 = ((tempOIValue - minOI4) / minOI4) * 100
          if (percentage4 > 3) {
            this.fireOIAlert('setup4', key, percentage4)
            lastAlertTimes.setup4[key] = Date.now()
          }

          // Setup 5 (1 min / 1.5%)
          const limitedArray5 = array.slice(0, Math.min(1, array.length))
          const minOI5 = Math.min(...limitedArray5.map((item) => item.oi))
          const percentage5 = ((tempOIValue - minOI5) / minOI5) * 100
          if (percentage5 > 1.5) {
            this.fireOIAlert('setup5', key, percentage5)
            lastAlertTimes.setup5[key] = Date.now()
          }
        }
      }
    })
  }

  // FIRE OI ALERT
  fireOIAlert(setup, key, percentage) {
    const currentTime = Date.now()
    const db = new JSONdb('database/db.json')
    const storage = db.JSON()

    if ((lastAlertTimes[setup][key] === undefined || currentTime - lastAlertTimes[setup][key] >= process.env.ALERT_SUSPEND_MINUTES * 60 * 1000) && volume1m[key] >= 100000) {
      lastAlertTimes[setup][key] = currentTime

      let setupText = ''
      if (setup === 'setup1') setupText = '10 min'
      if (setup === 'setup2') setupText = '60 min'
      if (setup === 'setup3') setupText = '180 min'
      if (setup === 'setup4') setupText = '1 min'
      if (setup === 'setup5') setupText = '1 min'

      const alertText = `<code>${key}</code> ${percentage.toFixed(2)}% / ${setupText}`

      Object.keys(storage).forEach(async (el) => {
        if (storage[el][setup]) {
          try {
            await bot.telegram.sendMessage(el, alertText, { parse_mode: 'HTML' })
          } catch (error) {
            if (error.response && error.response.error_code === 403) {
              // console.error(`User has blocked the bot for chat_id: ${el}`)
            } else {
              console.error('Error sending message:', error)
            }
          }
        }
      })
    }
  }
}

module.exports = Bybit
