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
            volBoostSetup1: false,
            volBoostSetup2: false,
            volBoostSetup3: false,
          },
          bybit: {
            oiSetup1: false,
            oiSetup2: false,
            oiSetup3: false,
            volBoostSetup1: false,
            volBoostSetup2: false,
            volBoostSetup3: false,
          },
          okx: {
            oiSetup1: false,
            oiSetup2: false,
            oiSetup3: false,
            volBoostSetup1: false,
            volBoostSetup2: false,
            volBoostSetup3: false,
          },
          mexc: {
            oiSetup1: false,
            oiSetup2: false,
            oiSetup3: false,
            volBoostSetup1: false,
            volBoostSetup2: false,
            volBoostSetup3: false,
          },
        }
      }
      ctx.reply(
        'Welcome to your bot! Press the "Settings" button to configure options.',
        mainKeyboards.settings()
      )
    }
  },

  // SETTINGS
  settings: async (ctx) => {
    if (store.messageIDs[ctx.chat.id]) {
      try {
        await ctx.deleteMessage(store.messageIDs[ctx.chat.id])
      } catch (error) {
        console.error('Error deleting message:', error)
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
