const store = require('../../../store')
const mainKeyboards = require('../keyboards/mainKeyboards')

const commands = {
  // START
  start: (ctx) => {
    const userIDs = process.env.USER_IDS.split(',')

    // Start message
    if (userIDs.includes(ctx.chat.id.toString())) {
      // Create user obj in store
      if (!store.users.hasOwnProperty(ctx.chat.id)) {
        store.users[ctx.chat.id] = {
          binance: {
            oiSetup1: false,
            oiSetup2: false,
            oiSetup3: false,
            oiDirection: 'BOTH',
            volBoostSetup1: false,
            volBoostSetup2: false,
            volBoostSetup3: false,
          },
          bybit: {
            oiSetup1: false,
            oiSetup2: false,
            oiSetup3: false,
            oiDirection: 'BOTH',
            volBoostSetup1: false,
            volBoostSetup2: false,
            volBoostSetup3: false,
          },
          okx: {
            oiSetup1: false,
            oiSetup2: false,
            oiSetup3: false,
            oiDirection: 'BOTH',
            volBoostSetup1: false,
            volBoostSetup2: false,
            volBoostSetup3: false,
          },
          mexc: {
            volBoostSetup1: false,
            volBoostSetup2: false,
            volBoostSetup3: false,
          },
        }
      }
      ctx.reply(
        'Welcome to your bot! Press the "Settings" button to configure options.',
        mainKeyboards.settings()
      )
    }
  },

  // TEST
  test: (ctx) => {
    const date = new Date(store.marketData.lastUpdateTime)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    let historicalDataLength = 0

    // Time
    const formattedDateTime = `${day < 10 ? '0' : ''}${day}.${
      month < 10 ? '0' : ''
    }${month}.${year} ${hours}:${minutes}:${seconds}`

    // Number of candles
    if (Object.keys(store.marketData.binance).length > 0) {
      const firstKey = Object.keys(store.marketData.binance)[0]
      historicalDataLength =
        store.marketData.binance[firstKey].historicalData.length
    }

    const messageText = `Last update: ${formattedDateTime} UTC\n\nCandles: ${historicalDataLength}`

    const userIDs = process.env.USER_IDS.split(',')

    if (userIDs.includes(ctx.chat.id.toString())) {
      ctx.reply(messageText)
    }
  },

  // SETTINGS
  settings: async (ctx) => {
    if (store.messageIDs[ctx.chat.id]) {
      try {
        await ctx.deleteMessage(store.messageIDs[ctx.chat.id])
      } catch (error) {
        // console.error('Error deleting message:', error)
      }
    }

    const message = await ctx.reply(
      'Select exchange:',
      mainKeyboards.exchanges()
    )

    // Save message_id to store
    store.messageIDs[ctx.chat.id] = message.message_id
  },

  // BACK TO MAIN
  backToMain: (ctx) => {
    ctx.editMessageText('Select exchange:', mainKeyboards.exchanges())
  },
}

module.exports = commands
