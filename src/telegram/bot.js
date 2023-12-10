require('dotenv').config()
const { Telegraf } = require('telegraf')
const commands = require('./commands')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(commands.start)
bot.hears('🎛 Settings', commands.settings)
bot.action('backToMain', commands.backToMain)
bot.action('bybit', commands.bybit)

module.exports = bot
