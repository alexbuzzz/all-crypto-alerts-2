const JSONdb = require('simple-json-db')
const keyboards = require('./keyboards')

let messageIDs = {}

const commands = {
  // START
  start: (ctx) => {
    const userIDs = process.env.USER_IDS.split(',')

    const db = new JSONdb('database/db.json')

    // Create user obj in DB
    if (!db.has(ctx.chat.id)) {
      db.set(ctx.chat.id, 'user')
    }

    // Pull messageIDs from DB
    if (!db.has('messageIDs')) {
      db.set('messageIDs', {})
    } else {
      messageIDs = db.get('messageIDs')
    }

    if (userIDs.includes(ctx.chat.id.toString())) {
      ctx.reply('Welcome to your bot! Press the "Settings" button to configure options.', keyboards.settings())
    }
  },

  // SETTINGS
  settings: async (ctx) => {
    const db = new JSONdb('database/db.json')

    if (messageIDs[ctx.chat.id]) {
      try {
        await ctx.deleteMessage(messageIDs[ctx.chat.id])
      } catch (error) {
        console.error('Error deleting message:', error)
      }
    }

    const message = await ctx.reply('Select exchange:', keyboards.exchanges())

    // Save message_id to DB
    messageIDs[ctx.chat.id] = message.message_id
    db.set('messageIDs', messageIDs)
  },

  // BACK TO MAIN
  backToMain: (ctx) => {
    ctx.editMessageText('Select exchange:', keyboards.exchanges())
  },

  // BYBIT
  bybit: (ctx) => {
    ctx.editMessageText('Select alert type:', keyboards.bybitAlertTypes())
  },
}

module.exports = commands
