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
            volBoostSetup4: false,
            volBoostSetup5: false,
          },
          bybit: {
            oiSetup1: false,
            oiSetup2: false,
            oiSetup3: false,
            oiDirection: 'BOTH',
            volBoostSetup1: false,
            volBoostSetup2: false,
            volBoostSetup3: false,
            volBoostSetup4: false,
            volBoostSetup5: false,
          },
          okx: {
            oiSetup1: false,
            oiSetup2: false,
            oiSetup3: false,
            oiDirection: 'BOTH',
            volBoostSetup1: false,
            volBoostSetup2: false,
            volBoostSetup3: false,
            volBoostSetup4: false,
            volBoostSetup5: false,
          },
          mexc: {
            volBoostSetup1: false,
            volBoostSetup2: false,
            volBoostSetup3: false,
            volBoostSetup4: false,
            volBoostSetup5: false,
          },
        }
      }
      ctx.reply(
        'Welcome to your bot!\n\nGo to menu and press "Settings" to configure alerts.'
      )
    }
  },

  // BINANCE OI FILTER
  binanceOI: (ctx) => {
    const passedNumber = ctx.match[1]

    // Check and initialize if needed
    if (!store.customFilters[ctx.chat.id]) {
      store.customFilters[ctx.chat.id] = {}
    }

    // Check and initialize exchange if needed
    if (!store.customFilters[ctx.chat.id]['binanceOI']) {
      store.customFilters[ctx.chat.id]['binanceOI'] = {}
    }

    store.customFilters[ctx.chat.id]['binanceOI'].all = Number(passedNumber)

    const messageText = `✅ Binance OI filter set to: ${passedNumber}K`

    const userIDs = process.env.USER_IDS.split(',')

    if (userIDs.includes(ctx.chat.id.toString())) {
      ctx.reply(messageText)
    }
  },

  // BINANCE OI FILTER SYMBOL
  binanceOISymbol: (ctx) => {
    const passedSymbol = ctx.match[1]
    const passedNumber = ctx.match[2]

    // Check and initialize if needed
    if (!store.customFilters[ctx.chat.id]) {
      store.customFilters[ctx.chat.id] = {}
    }

    // Check and initialize exchange if needed
    if (!store.customFilters[ctx.chat.id]['binanceOI']) {
      store.customFilters[ctx.chat.id]['binanceOI'] = {}
    }

    store.customFilters[ctx.chat.id]['binanceOI'][
      passedSymbol.toUpperCase().replace('USDT', '')
    ] = Number(passedNumber)

    const messageText = `✅ Binance OI ${passedSymbol} filter set to: ${passedNumber}K`

    const userIDs = process.env.USER_IDS.split(',')

    if (userIDs.includes(ctx.chat.id.toString())) {
      ctx.reply(messageText)
    }
  },

  // BINANCE VOL BOOST FILTER
  binanceVolBoost: (ctx) => {
    const passedNumber = ctx.match[1]

    // Check and initialize if needed
    if (!store.customFilters[ctx.chat.id]) {
      store.customFilters[ctx.chat.id] = {}
    }

    // Check and initialize exchange if needed
    if (!store.customFilters[ctx.chat.id]['binanceVolBoost']) {
      store.customFilters[ctx.chat.id]['binanceVolBoost'] = {}
    }

    store.customFilters[ctx.chat.id]['binanceVolBoost'].all =
      Number(passedNumber)

    const messageText = `✅ Binance Vol Boost filter set to: ${passedNumber}K`

    const userIDs = process.env.USER_IDS.split(',')

    if (userIDs.includes(ctx.chat.id.toString())) {
      ctx.reply(messageText)
    }
  },

  // BINANCE VOL BOOST FILTER SYMBOL
  binanceVolBoostSymbol: (ctx) => {
    const passedSymbol = ctx.match[1]
    const passedNumber = ctx.match[2]

    // Check and initialize if needed
    if (!store.customFilters[ctx.chat.id]) {
      store.customFilters[ctx.chat.id] = {}
    }

    // Check and initialize exchange if needed
    if (!store.customFilters[ctx.chat.id]['binanceVolBoost']) {
      store.customFilters[ctx.chat.id]['binanceVolBoost'] = {}
    }

    store.customFilters[ctx.chat.id]['binanceVolBoost'][
      passedSymbol.toUpperCase().replace('USDT', '')
    ] = Number(passedNumber)

    const messageText = `✅ Binance Vol Boost ${passedSymbol} filter set to: ${passedNumber}K`

    const userIDs = process.env.USER_IDS.split(',')

    if (userIDs.includes(ctx.chat.id.toString())) {
      ctx.reply(messageText)
    }
  },

  // BYBIT OI FILTER
  bybitOI: (ctx) => {
    const passedNumber = ctx.match[1]

    // Check and initialize if needed
    if (!store.customFilters[ctx.chat.id]) {
      store.customFilters[ctx.chat.id] = {}
    }

    // Check and initialize exchange if needed
    if (!store.customFilters[ctx.chat.id]['bybitOI']) {
      store.customFilters[ctx.chat.id]['bybitOI'] = {}
    }

    store.customFilters[ctx.chat.id]['bybitOI'].all = Number(passedNumber)

    const messageText = `✅ Bybit OI filter set to: ${passedNumber}K`

    const userIDs = process.env.USER_IDS.split(',')

    if (userIDs.includes(ctx.chat.id.toString())) {
      ctx.reply(messageText)
    }
  },

  // BYBIT OI FILTER SYMBOL
  bybitOISymbol: (ctx) => {
    const passedSymbol = ctx.match[1]
    const passedNumber = ctx.match[2]

    // Check and initialize if needed
    if (!store.customFilters[ctx.chat.id]) {
      store.customFilters[ctx.chat.id] = {}
    }

    // Check and initialize exchange if needed
    if (!store.customFilters[ctx.chat.id]['bybitOI']) {
      store.customFilters[ctx.chat.id]['bybitOI'] = {}
    }

    store.customFilters[ctx.chat.id]['bybitOI'][
      passedSymbol.toUpperCase().replace('USDT', '')
    ] = Number(passedNumber)

    const messageText = `✅ Bybit OI ${passedSymbol} filter set to: ${passedNumber}K`

    const userIDs = process.env.USER_IDS.split(',')

    if (userIDs.includes(ctx.chat.id.toString())) {
      ctx.reply(messageText)
    }
  },

  // BYBIT VOL BOOST FILTER
  bybitVolBoost: (ctx) => {
    const passedNumber = ctx.match[1]

    // Check and initialize if needed
    if (!store.customFilters[ctx.chat.id]) {
      store.customFilters[ctx.chat.id] = {}
    }

    // Check and initialize exchange if needed
    if (!store.customFilters[ctx.chat.id]['bybitVolBoost']) {
      store.customFilters[ctx.chat.id]['bybitVolBoost'] = {}
    }

    store.customFilters[ctx.chat.id]['bybitVolBoost'].all = Number(passedNumber)

    const messageText = `✅ Bybit Vol Boost filter set to: ${passedNumber}K`

    const userIDs = process.env.USER_IDS.split(',')

    if (userIDs.includes(ctx.chat.id.toString())) {
      ctx.reply(messageText)
    }
  },

  // BYBIT VOL BOOST FILTER SYMBOL
  bybitVolBoostSymbol: (ctx) => {
    const passedSymbol = ctx.match[1]
    const passedNumber = ctx.match[2]

    // Check and initialize if needed
    if (!store.customFilters[ctx.chat.id]) {
      store.customFilters[ctx.chat.id] = {}
    }

    // Check and initialize exchange if needed
    if (!store.customFilters[ctx.chat.id]['bybitVolBoost']) {
      store.customFilters[ctx.chat.id]['bybitVolBoost'] = {}
    }

    store.customFilters[ctx.chat.id]['bybitVolBoost'][
      passedSymbol.toUpperCase().replace('USDT', '')
    ] = Number(passedNumber)

    const messageText = `✅ Bybit Vol Boost ${passedSymbol} filter set to: ${passedNumber}K`

    const userIDs = process.env.USER_IDS.split(',')

    if (userIDs.includes(ctx.chat.id.toString())) {
      ctx.reply(messageText)
    }
  },

  // OKX OI FILTER
  okxOI: (ctx) => {
    const passedNumber = ctx.match[1]

    // Check and initialize if needed
    if (!store.customFilters[ctx.chat.id]) {
      store.customFilters[ctx.chat.id] = {}
    }

    // Check and initialize exchange if needed
    if (!store.customFilters[ctx.chat.id]['okxOI']) {
      store.customFilters[ctx.chat.id]['okxOI'] = {}
    }

    store.customFilters[ctx.chat.id]['okxOI'].all = Number(passedNumber)

    const messageText = `✅ OKX OI filter set to: ${passedNumber}K`

    const userIDs = process.env.USER_IDS.split(',')

    if (userIDs.includes(ctx.chat.id.toString())) {
      ctx.reply(messageText)
    }
  },

  // OKX OI FILTER SYMBOL
  okxOISymbol: (ctx) => {
    const passedSymbol = ctx.match[1]
    const passedNumber = ctx.match[2]

    // Check and initialize if needed
    if (!store.customFilters[ctx.chat.id]) {
      store.customFilters[ctx.chat.id] = {}
    }

    // Check and initialize exchange if needed
    if (!store.customFilters[ctx.chat.id]['okxOI']) {
      store.customFilters[ctx.chat.id]['okxOI'] = {}
    }

    store.customFilters[ctx.chat.id]['okxOI'][
      passedSymbol.toUpperCase().replace('USDT', '')
    ] = Number(passedNumber)

    const messageText = `✅ OKX OI ${passedSymbol} filter set to: ${passedNumber}K`

    const userIDs = process.env.USER_IDS.split(',')

    if (userIDs.includes(ctx.chat.id.toString())) {
      ctx.reply(messageText)
    }
  },

  // OKX VOL BOOST FILTER
  okxVolBoost: (ctx) => {
    const passedNumber = ctx.match[1]

    // Check and initialize if needed
    if (!store.customFilters[ctx.chat.id]) {
      store.customFilters[ctx.chat.id] = {}
    }

    // Check and initialize exchange if needed
    if (!store.customFilters[ctx.chat.id]['okxVolBoost']) {
      store.customFilters[ctx.chat.id]['okxVolBoost'] = {}
    }

    store.customFilters[ctx.chat.id]['okxVolBoost'].all = Number(passedNumber)

    const messageText = `✅ OKX Vol Boost filter set to: ${passedNumber}K`

    const userIDs = process.env.USER_IDS.split(',')

    if (userIDs.includes(ctx.chat.id.toString())) {
      ctx.reply(messageText)
    }
  },

  // OKX VOL BOOST FILTER SYMBOL
  okxVolBoostSymbol: (ctx) => {
    const passedSymbol = ctx.match[1]
    const passedNumber = ctx.match[2]

    // Check and initialize if needed
    if (!store.customFilters[ctx.chat.id]) {
      store.customFilters[ctx.chat.id] = {}
    }

    // Check and initialize exchange if needed
    if (!store.customFilters[ctx.chat.id]['okxVolBoost']) {
      store.customFilters[ctx.chat.id]['okxVolBoost'] = {}
    }

    store.customFilters[ctx.chat.id]['okxVolBoost'][
      passedSymbol.toUpperCase().replace('USDT', '')
    ] = Number(passedNumber)

    const messageText = `✅ OKX Vol Boost ${passedSymbol} filter set to: ${passedNumber}K`

    const userIDs = process.env.USER_IDS.split(',')

    if (userIDs.includes(ctx.chat.id.toString())) {
      ctx.reply(messageText)
    }
  },

  // MEXC VOL BOOST FILTER
  mexcVolBoost: (ctx) => {
    const passedNumber = ctx.match[1]

    // Check and initialize if needed
    if (!store.customFilters[ctx.chat.id]) {
      store.customFilters[ctx.chat.id] = {}
    }

    // Check and initialize exchange if needed
    if (!store.customFilters[ctx.chat.id]['mexcVolBoost']) {
      store.customFilters[ctx.chat.id]['mexcVolBoost'] = {}
    }

    store.customFilters[ctx.chat.id]['mexcVolBoost'].all = Number(passedNumber)

    const messageText = `✅ MEXC Vol Boost filter set to: ${passedNumber}K`

    const userIDs = process.env.USER_IDS.split(',')

    if (userIDs.includes(ctx.chat.id.toString())) {
      ctx.reply(messageText)
    }
  },

  // MEXC VOL BOOST FILTER SYMBOL
  mexcVolBoostSymbol: (ctx) => {
    const passedSymbol = ctx.match[1]
    const passedNumber = ctx.match[2]

    // Check and initialize if needed
    if (!store.customFilters[ctx.chat.id]) {
      store.customFilters[ctx.chat.id] = {}
    }

    // Check and initialize exchange if needed
    if (!store.customFilters[ctx.chat.id]['mexcVolBoost']) {
      store.customFilters[ctx.chat.id]['mexcVolBoost'] = {}
    }

    store.customFilters[ctx.chat.id]['mexcVolBoost'][
      passedSymbol.toUpperCase().replace('USDT', '')
    ] = Number(passedNumber)

    const messageText = `✅ MEXC Vol Boost ${passedSymbol} filter set to: ${passedNumber}K`

    const userIDs = process.env.USER_IDS.split(',')

    if (userIDs.includes(ctx.chat.id.toString())) {
      ctx.reply(messageText)
    }
  },

  // MAKE ALL FILTERS AS
  makeAllFiltersAs: (ctx) => {
    const passedNumber = ctx.match[1]

    // Check and initialize if needed
    if (!store.customFilters[ctx.chat.id]) {
      store.customFilters[ctx.chat.id] = {}
    }

    store.customFilters[ctx.chat.id]['binanceOI'] = {}
    store.customFilters[ctx.chat.id]['binanceOI'].all = Number(passedNumber)
    store.customFilters[ctx.chat.id]['binanceVolBoost'] = {}
    store.customFilters[ctx.chat.id]['binanceVolBoost'].all =
      Number(passedNumber)

    store.customFilters[ctx.chat.id]['bybitOI'] = {}
    store.customFilters[ctx.chat.id]['bybitOI'].all = Number(passedNumber)
    store.customFilters[ctx.chat.id]['bybitVolBoost'] = {}
    store.customFilters[ctx.chat.id]['bybitVolBoost'].all = Number(passedNumber)

    store.customFilters[ctx.chat.id]['okxOI'] = {}
    store.customFilters[ctx.chat.id]['okxOI'].all = Number(passedNumber)
    store.customFilters[ctx.chat.id]['okxVolBoost'] = {}
    store.customFilters[ctx.chat.id]['okxVolBoost'].all = Number(passedNumber)

    store.customFilters[ctx.chat.id]['mexcVolBoost'] = {}
    store.customFilters[ctx.chat.id]['mexcVolBoost'].all = Number(passedNumber)

    const messageText = `✅ ALL filters set to: ${passedNumber}K`

    const userIDs = process.env.USER_IDS.split(',')

    if (userIDs.includes(ctx.chat.id.toString())) {
      ctx.reply(messageText)
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

  // HELP
  filters: (ctx) => {
    const messageText = `ℹ️ All filters are 250 by default.\n\nYou can set volume filters for each exchange and each alert type and even for specific tickers.\n\nTo do this, send me one of the following commands:\n\n<code>binance_oi_100</code>\n<code>binance_vol_boost_100</code>\n<code>binance_oi_BTCUSDT_100</code>\n<code>binance_vol_boost_BTCUSDT_100</code>\n\n<code>bybit_oi_100</code>\n<code>bybit_vol_boost_100</code>\n<code>bybit_oi_BTCUSDT_100</code>\n<code>bybit_vol_boost_BTCUSDT_100</code>\n\n<code>okx_oi_100</code>\n<code>okx_vol_boost_100</code>\n<code>okx_oi_BTCUSDT_100</code>\n<code>okx_vol_boost_BTCUSDT_100</code>\n\n<code>mexc_vol_boost_100</code>\n<code>mexc_vol_boost_BTCUSDT_100</code>\n\n⚠️ To overwrite ALL filters use this command:\n<code>make_all_100</code>`

    const userIDs = process.env.USER_IDS.split(',')

    if (userIDs.includes(ctx.chat.id.toString())) {
      ctx.reply(messageText, {
        parse_mode: 'HTML',
      })
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
