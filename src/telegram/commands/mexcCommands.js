const store = require('../../../store')
const mexcKeyboards = require('../keyboards/mexcKeyboards')

const editOIMessageText = (ctx) => {
  ctx.editMessageText(
    `<strong>MEXC Open Interest</strong>\n\n${
      store.users[ctx.chat.id].mexc.oiSetup1 ? '✅' : '➖'
    } 1.5% 1min\n\n${
      store.users[ctx.chat.id].mexc.oiSetup2 ? '✅' : '➖'
    } 3% 1min\n\n${
      store.users[ctx.chat.id].mexc.oiSetup3 ? '✅' : '➖'
    } 10% 5min`,
    {
      parse_mode: 'HTML',
      ...mexcKeyboards.mexcOI(),
    }
  )
}

const editVolBoostMessageText = (ctx) => {
  ctx.editMessageText(
    `<strong>MEXC Volume Boost</strong>\n\n${
      store.users[ctx.chat.id].mexc.volBoostSetup1 ? '✅' : '➖'
    } 5X / 100min\n\n${
      store.users[ctx.chat.id].mexc.volBoostSetup2 ? '✅' : '➖'
    } 8X / 100min\n\n${
      store.users[ctx.chat.id].mexc.volBoostSetup3 ? '✅' : '➖'
    } 12X / 100min`,
    {
      parse_mode: 'HTML',
      ...mexcKeyboards.mexcVolBoost(),
    }
  )
}

const commands = {
  // MEXC
  mexc: (ctx) => {
    ctx.editMessageText('Select alert type:', mexcKeyboards.alertTypes())
  },

  // MEXC OI
  mexcOI: (ctx) => {
    ctx.editMessageText('Not available yet...', mexcKeyboards.mexcOI())
  },

  // MEXC VOL BOOST
  mexcVolBoost: (ctx) => {
    editVolBoostMessageText(ctx)
  },

  mexcVolBoostSetup1: (ctx) => {
    store.users[ctx.chat.id].mexc.volBoostSetup1 =
      !store.users[ctx.chat.id].mexc.volBoostSetup1

    editVolBoostMessageText(ctx)
  },

  mexcVolBoostSetup2: (ctx) => {
    store.users[ctx.chat.id].mexc.volBoostSetup2 =
      !store.users[ctx.chat.id].mexc.volBoostSetup2

    editVolBoostMessageText(ctx)
  },

  mexcVolBoostSetup3: (ctx) => {
    store.users[ctx.chat.id].mexc.volBoostSetup3 =
      !store.users[ctx.chat.id].mexc.volBoostSetup3
    editVolBoostMessageText(ctx)
  },
}

module.exports = commands
