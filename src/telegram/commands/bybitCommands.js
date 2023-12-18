const store = require('../../../store')
const bybitKeyboards = require('../keyboards/bybitKeyboards')

const commands = {
  // BYBIT
  bybit: (ctx) => {
    ctx.editMessageText('Select alert type:', bybitKeyboards.alertTypes())
  },

  // BYBIT OI
  bybitOI: (ctx) => {
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
  },

  bybitOIsetup1: (ctx) => {
    store.users[ctx.chat.id].bybit.oiSetup1 =
      !store.users[ctx.chat.id].bybit.oiSetup1

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
  },

  bybitOIsetup2: (ctx) => {
    store.users[ctx.chat.id].bybit.oiSetup2 =
      !store.users[ctx.chat.id].bybit.oiSetup2

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
  },

  bybitOIsetup3: (ctx) => {
    store.users[ctx.chat.id].bybit.oiSetup3 =
      !store.users[ctx.chat.id].bybit.oiSetup3

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
  },

  // BYBIT VOL BOOST
  bybitVolBoost: (ctx) => {
    ctx.editMessageText(
      `<strong>Bybit Volume Boost</strong>\n\n${
        store.users[ctx.chat.id].bybit.volBoostSetup1 ? '✅' : '➖'
      } 1.5% 1min\n\n${
        store.users[ctx.chat.id].bybit.volBoostSetup2 ? '✅' : '➖'
      } 3% 1min\n\n${
        store.users[ctx.chat.id].bybit.volBoostSetup3 ? '✅' : '➖'
      } 10% 5min`,
      {
        parse_mode: 'HTML',
        ...bybitKeyboards.bybitVolBoost(),
      }
    )
  },

  bybitVolBoostSetup1: (ctx) => {
    store.users[ctx.chat.id].bybit.volBoostSetup1 =
      !store.users[ctx.chat.id].bybit.volBoostSetup1

    ctx.editMessageText(
      `<strong>Bybit Volume Boost</strong>\n\n${
        store.users[ctx.chat.id].bybit.volBoostSetup1 ? '✅' : '➖'
      } 1.5% 1min\n\n${
        store.users[ctx.chat.id].bybit.volBoostSetup2 ? '✅' : '➖'
      } 3% 1min\n\n${
        store.users[ctx.chat.id].bybit.volBoostSetup3 ? '✅' : '➖'
      } 10% 5min`,
      {
        parse_mode: 'HTML',
        ...bybitKeyboards.bybitVolBoost(),
      }
    )
  },

  bybitVolBoostSetup2: (ctx) => {
    store.users[ctx.chat.id].bybit.volBoostSetup2 =
      !store.users[ctx.chat.id].bybit.volBoostSetup2

    ctx.editMessageText(
      `<strong>Bybit Volume Boost</strong>\n\n${
        store.users[ctx.chat.id].bybit.volBoostSetup1 ? '✅' : '➖'
      } 1.5% 1min\n\n${
        store.users[ctx.chat.id].bybit.volBoostSetup2 ? '✅' : '➖'
      } 3% 1min\n\n${
        store.users[ctx.chat.id].bybit.volBoostSetup3 ? '✅' : '➖'
      } 10% 5min`,
      {
        parse_mode: 'HTML',
        ...bybitKeyboards.bybitVolBoost(),
      }
    )
  },

  bybitVolBoostSetup3: (ctx) => {
    store.users[ctx.chat.id].bybit.volBoostSetup3 =
      !store.users[ctx.chat.id].bybit.volBoostSetup3

    ctx.editMessageText(
      `<strong>Bybit Volume Boost</strong>\n\n${
        store.users[ctx.chat.id].bybit.volBoostSetup1 ? '✅' : '➖'
      } 1.5% 1min\n\n${
        store.users[ctx.chat.id].bybit.volBoostSetup2 ? '✅' : '➖'
      } 3% 1min\n\n${
        store.users[ctx.chat.id].bybit.volBoostSetup3 ? '✅' : '➖'
      } 10% 5min`,
      {
        parse_mode: 'HTML',
        ...bybitKeyboards.bybitVolBoost(),
      }
    )
  },
}

module.exports = commands
