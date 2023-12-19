const store = require('../../../store')
const bybitKeyboards = require('../keyboards/bybitKeyboards')

const editOIMessageText = (ctx) => {
  ctx.editMessageText(
    `<strong>Bybit Open Interest</strong>\n\n${
      store.users[ctx.chat.id].bybit.oiSetup1 ? '✅' : '➖'
    } 1.5% 1min\n\n${
      store.users[ctx.chat.id].bybit.oiSetup2 ? '✅' : '➖'
    } 3% 1min\n\n${
      store.users[ctx.chat.id].bybit.oiSetup3 ? '✅' : '➖'
    } 10% 5min`,
    {
      parse_mode: 'HTML',
      ...bybitKeyboards.bybitOI(),
    }
  )
}

const editVolBoostMessageText = (ctx) => {
  ctx.editMessageText(
    `<strong>Bybit Volume Boost</strong>\n\n${
      store.users[ctx.chat.id].bybit.volBoostSetup1 ? '✅' : '➖'
    } 5X / 100min\n\n${
      store.users[ctx.chat.id].bybit.volBoostSetup2 ? '✅' : '➖'
    } 8X / 100min\n\n${
      store.users[ctx.chat.id].bybit.volBoostSetup3 ? '✅' : '➖'
    } 12X / 100min`,
    {
      parse_mode: 'HTML',
      ...bybitKeyboards.bybitVolBoost(),
    }
  )
}

const commands = {
  // BYBIT
  bybit: (ctx) => {
    ctx.editMessageText('Select alert type:', bybitKeyboards.alertTypes())
  },

  // BYBIT OI
  bybitOI: (ctx) => {
    editOIMessageText(ctx)
  },

  bybitOIsetup1: (ctx) => {
    store.users[ctx.chat.id].bybit.oiSetup1 =
      !store.users[ctx.chat.id].bybit.oiSetup1

    editOIMessageText(ctx)
  },

  bybitOIsetup2: (ctx) => {
    store.users[ctx.chat.id].bybit.oiSetup2 =
      !store.users[ctx.chat.id].bybit.oiSetup2

    editOIMessageText(ctx)
  },

  bybitOIsetup3: (ctx) => {
    store.users[ctx.chat.id].bybit.oiSetup3 =
      !store.users[ctx.chat.id].bybit.oiSetup3

    editOIMessageText(ctx)
  },

  // BYBIT VOL BOOST
  bybitVolBoost: (ctx) => {
    editVolBoostMessageText(ctx)
  },

  bybitVolBoostSetup1: (ctx) => {
    store.users[ctx.chat.id].bybit.volBoostSetup1 =
      !store.users[ctx.chat.id].bybit.volBoostSetup1

    editVolBoostMessageText(ctx)
  },

  bybitVolBoostSetup2: (ctx) => {
    store.users[ctx.chat.id].bybit.volBoostSetup2 =
      !store.users[ctx.chat.id].bybit.volBoostSetup2

    editVolBoostMessageText(ctx)
  },

  bybitVolBoostSetup3: (ctx) => {
    store.users[ctx.chat.id].bybit.volBoostSetup3 =
      !store.users[ctx.chat.id].bybit.volBoostSetup3
    editVolBoostMessageText(ctx)
  },
}

module.exports = commands
