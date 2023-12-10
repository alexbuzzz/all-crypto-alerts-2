require('dotenv').config()
const Bybit = require('./src/bybit/bybit')
const cron = require('node-cron')

const bybit = new Bybit()

let alertInterval = null

const db = new JSONdb('database/db.json')

// Start telegram bot
bot.start((ctx) => {
  // Create init user data in DB
  const user = {
    setup1: true,
    setup2: true,
    setup3: true,
    setup4: true,
    setup5: true,
  }

  const db = new JSONdb('database/db.json')
  if (!db.has(ctx.chat.id)) {
    db.set(ctx.chat.id, user)
  }
})

// Press settings button
bot.hears('Settings', async (ctx) => {
  const db = new JSONdb('database/db.json')
  const storage = db.JSON()[ctx.chat.id]
  let setup1State = storage.setup1 ? '🟢' : '🔴'
  let setup2State = storage.setup2 ? '🟢' : '🔴'
  let setup3State = storage.setup3 ? '🟢' : '🔴'
  let setup4State = storage.setup4 ? '🟢' : '🔴'
  let setup5State = storage.setup5 ? '🟢' : '🔴'

  const settingsKeyboard = Markup.inlineKeyboard([[Markup.button.callback(`1.5% / 1 min ${setup5State}`, 'setup5')], [Markup.button.callback(`3% / 1 min ${setup4State}`, 'setup4')], [Markup.button.callback(`5% / 10 min ${setup1State}`, 'setup1')], [Markup.button.callback(`10% / 60 min ${setup2State}`, 'setup2')], [Markup.button.callback(`20% / 180 min ${setup3State}`, 'setup3')]])

  const message = await ctx.reply('Choose a setting to toggle:', settingsKeyboard)
})

bot.action('setup1', async (ctx) => {
  const db = new JSONdb('database/db.json')
  const storage = db.JSON()[ctx.chat.id]

  storage.setup1 = !storage.setup1

  let setup1State = storage.setup1 ? '🟢' : '🔴'
  let setup2State = storage.setup2 ? '🟢' : '🔴'
  let setup3State = storage.setup3 ? '🟢' : '🔴'
  let setup4State = storage.setup4 ? '🟢' : '🔴'
  let setup5State = storage.setup5 ? '🟢' : '🔴'
  db.set(ctx.chat.id, storage)

  const updatedKeyboard = Markup.inlineKeyboard([[Markup.button.callback(`1.5% / 1 min ${setup5State}`, 'setup5')], [Markup.button.callback(`3% / 1 min ${setup4State}`, 'setup4')], [Markup.button.callback(`5% / 10 min ${setup1State}`, 'setup1')], [Markup.button.callback(`10% / 60 min ${setup2State}`, 'setup2')], [Markup.button.callback(`20% / 180 min ${setup3State}`, 'setup3')]])

  try {
    await ctx.editMessageText(`Alert 1 is changed to ${storage.setup1 ? 'ON' : 'OFF'}`, updatedKeyboard)
  } catch (error) {
    console.error('Error editing message:', error)
  }
})

bot.action('setup2', async (ctx) => {
  const db = new JSONdb('database/db.json')
  const storage = db.JSON()[ctx.chat.id]

  storage.setup2 = !storage.setup2

  let setup1State = storage.setup1 ? '🟢' : '🔴'
  let setup2State = storage.setup2 ? '🟢' : '🔴'
  let setup3State = storage.setup3 ? '🟢' : '🔴'
  let setup4State = storage.setup4 ? '🟢' : '🔴'
  let setup5State = storage.setup5 ? '🟢' : '🔴'
  db.set(ctx.chat.id, storage)

  const updatedKeyboard = Markup.inlineKeyboard([[Markup.button.callback(`1.5% / 1 min ${setup5State}`, 'setup5')], [Markup.button.callback(`3% / 1 min ${setup4State}`, 'setup4')], [Markup.button.callback(`5% / 10 min ${setup1State}`, 'setup1')], [Markup.button.callback(`10% / 60 min ${setup2State}`, 'setup2')], [Markup.button.callback(`20% / 180 min ${setup3State}`, 'setup3')]])

  try {
    await ctx.editMessageText(`Alert 2 is changed to ${storage.setup2 ? 'ON' : 'OFF'}`, updatedKeyboard)
  } catch (error) {
    console.error('Error editing message:', error)
  }
})

bot.action('setup3', async (ctx) => {
  const db = new JSONdb('database/db.json')
  const storage = db.JSON()[ctx.chat.id]

  storage.setup3 = !storage.setup3

  let setup1State = storage.setup1 ? '🟢' : '🔴'
  let setup2State = storage.setup2 ? '🟢' : '🔴'
  let setup3State = storage.setup3 ? '🟢' : '🔴'
  let setup4State = storage.setup4 ? '🟢' : '🔴'
  let setup5State = storage.setup5 ? '🟢' : '🔴'
  db.set(ctx.chat.id, storage)

  const updatedKeyboard = Markup.inlineKeyboard([[Markup.button.callback(`1.5% / 1 min ${setup5State}`, 'setup5')], [Markup.button.callback(`3% / 1 min ${setup4State}`, 'setup4')], [Markup.button.callback(`5% / 10 min ${setup1State}`, 'setup1')], [Markup.button.callback(`10% / 60 min ${setup2State}`, 'setup2')], [Markup.button.callback(`20% / 180 min ${setup3State}`, 'setup3')]])
  try {
    await ctx.editMessageText(`Alert 3 is changed to ${storage.setup3 ? 'ON' : 'OFF'}`, updatedKeyboard)
  } catch (error) {
    console.error('Error editing message:', error)
  }
})

bot.action('setup4', async (ctx) => {
  const db = new JSONdb('database/db.json')
  const storage = db.JSON()[ctx.chat.id]

  storage.setup4 = !storage.setup4

  let setup1State = storage.setup1 ? '🟢' : '🔴'
  let setup2State = storage.setup2 ? '🟢' : '🔴'
  let setup3State = storage.setup3 ? '🟢' : '🔴'
  let setup4State = storage.setup4 ? '🟢' : '🔴'
  let setup5State = storage.setup5 ? '🟢' : '🔴'
  db.set(ctx.chat.id, storage)

  const updatedKeyboard = Markup.inlineKeyboard([[Markup.button.callback(`1.5% / 1 min ${setup5State}`, 'setup5')], [Markup.button.callback(`3% / 1 min ${setup4State}`, 'setup4')], [Markup.button.callback(`5% / 10 min ${setup1State}`, 'setup1')], [Markup.button.callback(`10% / 60 min ${setup2State}`, 'setup2')], [Markup.button.callback(`20% / 180 min ${setup3State}`, 'setup3')]])
  try {
    await ctx.editMessageText(`Alert 4 is changed to ${storage.setup4 ? 'ON' : 'OFF'}`, updatedKeyboard)
  } catch (error) {
    console.error('Error editing message:', error)
  }
})

bot.action('setup5', async (ctx) => {
  const db = new JSONdb('database/db.json')
  const storage = db.JSON()[ctx.chat.id]

  storage.setup5 = !storage.setup5

  let setup1State = storage.setup1 ? '🟢' : '🔴'
  let setup2State = storage.setup2 ? '🟢' : '🔴'
  let setup3State = storage.setup3 ? '🟢' : '🔴'
  let setup4State = storage.setup4 ? '🟢' : '🔴'
  let setup5State = storage.setup5 ? '🟢' : '🔴'
  db.set(ctx.chat.id, storage)

  const updatedKeyboard = Markup.inlineKeyboard([[Markup.button.callback(`1.5% / 1 min ${setup5State}`, 'setup5')], [Markup.button.callback(`3% / 1 min ${setup4State}`, 'setup4')], [Markup.button.callback(`5% / 10 min ${setup1State}`, 'setup1')], [Markup.button.callback(`10% / 60 min ${setup2State}`, 'setup2')], [Markup.button.callback(`20% / 180 min ${setup3State}`, 'setup3')]])
  try {
    await ctx.editMessageText(`Alert 5 is changed to ${storage.setup5 ? 'ON' : 'OFF'}`, updatedKeyboard)
  } catch (error) {
    console.error('Error editing message:', error)
  }
})

// Start main functions
const start = async () => {
  await bybit.pullDataFromDB()
  await bybit.getSymbols()
  bybit.startOIStream()
  bybit.startKlineStream()

  alertInterval = setInterval(() => {
    bybit.calcOIPercentage()
  }, 10000)
}

// Cron every minute
cron.schedule('* * * * *', () => {
  // Save to DB every minute
  bybit.saveCurrentOI()
  bybit.saveLastAlertTimes()

  // Restart every hour to get new listed coins data
  const currentDate = new Date()
  const currentMinute = currentDate.getMinutes()

  if (currentMinute === 0) {
    setTimeout(() => {
      console.log('Restarting...')
      bybit.stopOIStream()
      bybit.stopKlineStream()
      clearInterval(alertInterval)

      setTimeout(() => {
        start()
      }, 5000)
    }, 30000)
  }
})

start()

bot.launch()
