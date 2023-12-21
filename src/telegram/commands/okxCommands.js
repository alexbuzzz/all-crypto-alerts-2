const store = require('../../../store')
const okxKeyboards = require('../keyboards/okxKeyboards')

const editOIMessageText = (ctx) => {
  ctx.editMessageText(
    `<strong>OKX Open Interest</strong>\n\n${
      store.users[ctx.chat.id].okx.oiSetup1 ? '✅' : '➖'
    } 1.5% 1min\n\n${
      store.users[ctx.chat.id].okx.oiSetup2 ? '✅' : '➖'
    } 3% 1min\n\n${
      store.users[ctx.chat.id].okx.oiSetup3 ? '✅' : '➖'
    } 10% 5min\n\nSide: ${store.users[ctx.chat.id].okx.oiDirection}`,
    {
      parse_mode: 'HTML',
      ...okxKeyboards.okxOI(),
    }
  )
}

const editVolBoostMessageText = (ctx) => {
  ctx.editMessageText(
    `<strong>OKX Volume Boost</strong>\n\n${
      store.users[ctx.chat.id].okx.volBoostSetup1 ? '✅' : '➖'
    } 5X / 100min\n\n${
      store.users[ctx.chat.id].okx.volBoostSetup2 ? '✅' : '➖'
    } 8X / 100min\n\n${
      store.users[ctx.chat.id].okx.volBoostSetup3 ? '✅' : '➖'
    } 12X / 100min`,
    {
      parse_mode: 'HTML',
      ...okxKeyboards.okxVolBoost(),
    }
  )
}

const commands = {
  // OKX
  okx: (ctx) => {
    ctx.editMessageText('Select alert type:', okxKeyboards.alertTypes())
  },

  // OKX OI
  okxOI: (ctx) => {
    editOIMessageText(ctx)
  },

  okxOIsetup1: (ctx) => {
    store.users[ctx.chat.id].okx.oiSetup1 =
      !store.users[ctx.chat.id].okx.oiSetup1

    editOIMessageText(ctx)
  },

  okxOIsetup2: (ctx) => {
    store.users[ctx.chat.id].okx.oiSetup2 =
      !store.users[ctx.chat.id].okx.oiSetup2

    editOIMessageText(ctx)
  },

  okxOIsetup3: (ctx) => {
    store.users[ctx.chat.id].okx.oiSetup3 =
      !store.users[ctx.chat.id].okx.oiSetup3

    editOIMessageText(ctx)
  },

  okxOIswitchDirection: (ctx) => {
    switch (store.users[ctx.chat.id].okx.oiDirection) {
      case 'BOTH':
        store.users[ctx.chat.id].okx.oiDirection = 'LONG'
        break
      case 'LONG':
        store.users[ctx.chat.id].okx.oiDirection = 'SHORT'
        break
      case 'SHORT':
        store.users[ctx.chat.id].okx.oiDirection = 'BOTH'
        break
    }

    editOIMessageText(ctx)
  },

  // OKX VOL BOOST
  okxVolBoost: (ctx) => {
    editVolBoostMessageText(ctx)
  },

  okxVolBoostSetup1: (ctx) => {
    store.users[ctx.chat.id].okx.volBoostSetup1 =
      !store.users[ctx.chat.id].okx.volBoostSetup1

    editVolBoostMessageText(ctx)
  },

  okxVolBoostSetup2: (ctx) => {
    store.users[ctx.chat.id].okx.volBoostSetup2 =
      !store.users[ctx.chat.id].okx.volBoostSetup2

    editVolBoostMessageText(ctx)
  },

  okxVolBoostSetup3: (ctx) => {
    store.users[ctx.chat.id].okx.volBoostSetup3 =
      !store.users[ctx.chat.id].okx.volBoostSetup3
    editVolBoostMessageText(ctx)
  },
}

module.exports = commands
