const store = require('../../../store')
const binanceKeyboards = require('../keyboards/binanceKeyboards')

const editOIMessageText = (ctx) => {
  ctx.editMessageText(
    `<strong>Binance Open Interest</strong>\n\n${
      store.users[ctx.chat.id].binance.oiSetup1 ? '✅' : '➖'
    } 1.5% 1min\n\n${
      store.users[ctx.chat.id].binance.oiSetup2 ? '✅' : '➖'
    } 3% 1min\n\n${
      store.users[ctx.chat.id].binance.oiSetup3 ? '✅' : '➖'
    } 10% 5min\n\nSide: ${store.users[ctx.chat.id].binance.oiDirection}`,
    {
      parse_mode: 'HTML',
      ...binanceKeyboards.binanceOI(),
    }
  )
}

const editVolBoostMessageText = (ctx) => {
  ctx.editMessageText(
    `<strong>Binance Volume Boost</strong>\n\n${
      store.users[ctx.chat.id].binance.volBoostSetup1 ? '✅' : '➖'
    } 8X / 100min\n\n${
      store.users[ctx.chat.id].binance.volBoostSetup2 ? '✅' : '➖'
    } 12X / 100min\n\n${
      store.users[ctx.chat.id].binance.volBoostSetup3 ? '✅' : '➖'
    } 20X / 100min\n\n${
      store.users[ctx.chat.id].binance.volBoostSetup4 ? '✅' : '➖'
    } 20X / 20min\n\n${
      store.users[ctx.chat.id].binance.volBoostSetup5 ? '✅' : '➖'
    } 1X / 1min`,
    {
      parse_mode: 'HTML',
      ...binanceKeyboards.binanceVolBoost(),
    }
  )
}

const commands = {
  // BINANCE
  binance: (ctx) => {
    ctx.editMessageText('Binance alert type:', binanceKeyboards.alertTypes())
  },

  // BINANCE OI
  binanceOI: (ctx) => {
    editOIMessageText(ctx)
  },

  binanceOIsetup1: (ctx) => {
    store.users[ctx.chat.id].binance.oiSetup1 =
      !store.users[ctx.chat.id].binance.oiSetup1

    editOIMessageText(ctx)
  },

  binanceOIsetup2: (ctx) => {
    store.users[ctx.chat.id].binance.oiSetup2 =
      !store.users[ctx.chat.id].binance.oiSetup2

    editOIMessageText(ctx)
  },

  binanceOIsetup3: (ctx) => {
    store.users[ctx.chat.id].binance.oiSetup3 =
      !store.users[ctx.chat.id].binance.oiSetup3

    editOIMessageText(ctx)
  },

  binanceOIswitchDirection: (ctx) => {
    switch (store.users[ctx.chat.id].binance.oiDirection) {
      case 'BOTH':
        store.users[ctx.chat.id].binance.oiDirection = 'LONG'
        break
      case 'LONG':
        store.users[ctx.chat.id].binance.oiDirection = 'SHORT'
        break
      case 'SHORT':
        store.users[ctx.chat.id].binance.oiDirection = 'BOTH'
        break
    }

    editOIMessageText(ctx)
  },

  // BINANCE VOL BOOST
  binanceVolBoost: (ctx) => {
    editVolBoostMessageText(ctx)
  },

  binanceVolBoostSetup1: (ctx) => {
    store.users[ctx.chat.id].binance.volBoostSetup1 =
      !store.users[ctx.chat.id].binance.volBoostSetup1

    editVolBoostMessageText(ctx)
  },

  binanceVolBoostSetup2: (ctx) => {
    store.users[ctx.chat.id].binance.volBoostSetup2 =
      !store.users[ctx.chat.id].binance.volBoostSetup2

    editVolBoostMessageText(ctx)
  },

  binanceVolBoostSetup3: (ctx) => {
    store.users[ctx.chat.id].binance.volBoostSetup3 =
      !store.users[ctx.chat.id].binance.volBoostSetup3

    editVolBoostMessageText(ctx)
  },

  binanceVolBoostSetup4: (ctx) => {
    store.users[ctx.chat.id].binance.volBoostSetup4 =
      !store.users[ctx.chat.id].binance.volBoostSetup4

    editVolBoostMessageText(ctx)
  },

  binanceVolBoostSetup5: (ctx) => {
    store.users[ctx.chat.id].binance.volBoostSetup5 =
      !store.users[ctx.chat.id].binance.volBoostSetup5

    editVolBoostMessageText(ctx)
  },
}

module.exports = commands
