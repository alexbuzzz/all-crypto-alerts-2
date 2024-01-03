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
    } 10% 5min\n\nSide: ${store.users[ctx.chat.id].bybit.oiDirection}`,
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
    } 8X / 100min\n\n${
      store.users[ctx.chat.id].bybit.volBoostSetup2 ? '✅' : '➖'
    } 12X / 100min\n\n${
      store.users[ctx.chat.id].bybit.volBoostSetup3 ? '✅' : '➖'
    } 20X / 100min\n\n${
      store.users[ctx.chat.id].bybit.volBoostSetup4 ? '✅' : '➖'
    } 20X / 20min\n\n${
      store.users[ctx.chat.id].bybit.volBoostSetup5 ? '✅' : '➖'
    } 1X / 1min`,
    {
      parse_mode: 'HTML',
      ...bybitKeyboards.bybitVolBoost(),
    }
  )
}

const commands = {
  // BYBIT
  bybit: (ctx) => {
    ctx.editMessageText('Bybit alert type:', bybitKeyboards.alertTypes())
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

  bybitOIswitchDirection: (ctx) => {
    switch (store.users[ctx.chat.id].bybit.oiDirection) {
      case 'BOTH':
        store.users[ctx.chat.id].bybit.oiDirection = 'LONG'
        break
      case 'LONG':
        store.users[ctx.chat.id].bybit.oiDirection = 'SHORT'
        break
      case 'SHORT':
        store.users[ctx.chat.id].bybit.oiDirection = 'BOTH'
        break
    }

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

  bybitVolBoostSetup4: (ctx) => {
    store.users[ctx.chat.id].bybit.volBoostSetup4 =
      !store.users[ctx.chat.id].bybit.volBoostSetup4

    editVolBoostMessageText(ctx)
  },

  bybitVolBoostSetup5: (ctx) => {
    store.users[ctx.chat.id].bybit.volBoostSetup5 =
      !store.users[ctx.chat.id].bybit.volBoostSetup5

    editVolBoostMessageText(ctx)
  },
}

module.exports = commands
