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
    } 10% 5min`,
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
    } 5X / 100min\n\n${
      store.users[ctx.chat.id].binance.volBoostSetup2 ? '✅' : '➖'
    } 8X / 100min\n\n${
      store.users[ctx.chat.id].binance.volBoostSetup3 ? '✅' : '➖'
    } 12X / 100min`,
    {
      parse_mode: 'HTML',
      ...binanceKeyboards.binanceVolBoost(),
    }
  )
}

const commands = {
  // BINANCE
  binance: (ctx) => {
    ctx.editMessageText('Select alert type:', binanceKeyboards.alertTypes())
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
}

module.exports = commands
