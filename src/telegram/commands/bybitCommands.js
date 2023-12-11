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
      `<strong>Bybit Open Interest</strong>\n\n${store.users[ctx.chat.id].bybit.oiSetup1 ? '✅' : '➖'} 1.5% 1min\n\n${store.users[ctx.chat.id].bybit.oiSetup2 ? '✅' : '➖'} 3% 1min\n\n${
        store.users[ctx.chat.id].bybit.oiSetup3 ? '✅' : '➖'
      } 10% 5min\n\nVolume filter ($): 50K\n\n${store.users[ctx.chat.id].bybit.oiSetup1 ? '✅' : '➖'} LONG\n\n${store.users[ctx.chat.id].bybit.oiSetup1 ? '✅' : '➖'} SHORT`,
      {
        parse_mode: 'HTML',
        ...bybitKeyboards.bybitOI(),
      }
    )
  },

  bybitOIsetup1: (ctx) => {
    store.users[ctx.chat.id].bybit.oiSetup1 = !store.users[ctx.chat.id].bybit.oiSetup1

    ctx.editMessageText(
      `<strong>Bybit Open Interest</strong>\n\n${store.users[ctx.chat.id].bybit.oiSetup1 ? '✅' : '➖'} 1.5% 1min\n\n${store.users[ctx.chat.id].bybit.oiSetup2 ? '✅' : '➖'} 3% 1min\n\n${
        store.users[ctx.chat.id].bybit.oiSetup3 ? '✅' : '➖'
      } 10% 5min\n\nVolume filter ($): 50K\n\n${store.users[ctx.chat.id].bybit.oiSetup1 ? '✅' : '➖'} LONG\n\n${store.users[ctx.chat.id].bybit.oiSetup1 ? '✅' : '➖'} SHORT`,
      {
        parse_mode: 'HTML',
        ...bybitKeyboards.bybitOI(),
      }
    )
  },

  bybitOIsetup2: (ctx) => {
    store.users[ctx.chat.id].bybit.oiSetup2 = !store.users[ctx.chat.id].bybit.oiSetup2

    ctx.editMessageText(
      `<strong>Bybit Open Interest</strong>\n\n${store.users[ctx.chat.id].bybit.oiSetup1 ? '✅' : '➖'} 1.5% 1min\n\n${store.users[ctx.chat.id].bybit.oiSetup2 ? '✅' : '➖'} 3% 1min\n\n${
        store.users[ctx.chat.id].bybit.oiSetup3 ? '✅' : '➖'
      } 10% 5min\n\nVolume filter ($): 50K\n\n${store.users[ctx.chat.id].bybit.oiSetup1 ? '✅' : '➖'} LONG\n\n${store.users[ctx.chat.id].bybit.oiSetup1 ? '✅' : '➖'} SHORT`,
      {
        parse_mode: 'HTML',
        ...bybitKeyboards.bybitOI(),
      }
    )
  },

  bybitOIsetup3: (ctx) => {
    store.users[ctx.chat.id].bybit.oiSetup3 = !store.users[ctx.chat.id].bybit.oiSetup3

    ctx.editMessageText(
      `<strong>Bybit Open Interest</strong>\n\n${store.users[ctx.chat.id].bybit.oiSetup1 ? '✅' : '➖'} 1.5% 1min\n\n${store.users[ctx.chat.id].bybit.oiSetup2 ? '✅' : '➖'} 3% 1min\n\n${
        store.users[ctx.chat.id].bybit.oiSetup3 ? '✅' : '➖'
      } 10% 5min\n\nVolume filter ($): 50K\n\n${store.users[ctx.chat.id].bybit.oiSetup1 ? '✅' : '➖'} LONG\n\n${store.users[ctx.chat.id].bybit.oiSetup1 ? '✅' : '➖'} SHORT`,
      {
        parse_mode: 'HTML',
        ...bybitKeyboards.bybitOI(),
      }
    )
  },

  // BYBIT VOL BOOST
  bybitVolBoost: (ctx) => {
    ctx.editMessageText('Not available yet...', bybitKeyboards.bybitVolBoost())
  },
}

module.exports = commands
