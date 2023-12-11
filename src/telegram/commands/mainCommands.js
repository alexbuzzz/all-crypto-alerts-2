const store = require('../../../store')
const mainKeyboards = require('../keyboards/mainKeyboards')

const commands = {
  // START
  start: (ctx) => {
    const userIDs = process.env.USER_IDS.split(',')

    // Create user obj in store
    if (!store.users.hasOwnProperty(ctx.chat.id)) {
      store.users[ctx.chat.id] = {
        bybit: {
          oiSetup1: false,
          oiSetup2: false,
          oiSetup3: false,
          oiVolFilter: 0,
          oiLong: true,
          oiShort: true,
          volBoostSetup1: false,
          volBoostSetup2: false,
          volBoostSetup3: false,
          volBoostVolFilter: 0,
          volBoostLong: true,
          volBoostShort: true,
        },
        okx: {
          oiSetup1: false,
          oiSetup2: false,
          oiSetup3: false,
          oiVolFilter: 0,
          oiLong: true,
          oiShort: true,
          volBoostSetup1: false,
          volBoostSetup2: false,
          volBoostSetup3: false,
          volBoostVolFilter: 0,
          volBoostLong: true,
          volBoostShort: true,
        },
        mexc: {
          oiSetup1: false,
          oiSetup2: false,
          oiSetup3: false,
          oiVolFilter: 0,
          oiLong: true,
          oiShort: true,
          volBoostSetup1: false,
          volBoostSetup2: false,
          volBoostSetup3: false,
          volBoostVolFilter: 0,
          volBoostLong: true,
          volBoostShort: true,
        },
      }
    }

    // Start message
    if (userIDs.includes(ctx.chat.id.toString())) {
      ctx.reply('Welcome to your bot! Press the "Settings" button to configure options.', mainKeyboards.settings())
    }
  },

  // SETTINGS
  settings: async (ctx) => {
    // const db = new JSONdb('database/db.json')

    if (store.messageIDs[ctx.chat.id]) {
      try {
        await ctx.deleteMessage(store.messageIDs[ctx.chat.id])
      } catch (error) {
        console.error('Error deleting message:', error)
      }
    }

    const message = await ctx.reply('Select exchange:', mainKeyboards.exchanges())

    // Save message_id to DB
    store.messageIDs[ctx.chat.id] = message.message_id
  },

  // BACK TO MAIN
  backToMain: (ctx) => {
    ctx.editMessageText('Select exchange:', mainKeyboards.exchanges())
  },
}

module.exports = commands
