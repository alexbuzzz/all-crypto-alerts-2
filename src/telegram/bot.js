require('dotenv').config()
const { Telegraf } = require('telegraf')
const mainCommands = require('./commands/mainCommands')
const bybitCommands = require('./commands/bybitCommands')
const okxCommands = require('./commands/okxCommands')
const mexcCommands = require('./commands/mexcCommands')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(mainCommands.start)
bot.hears('🎛 Settings', mainCommands.settings)
bot.action('backToMain', mainCommands.backToMain)

// Binance

// Bybit
bot.action('bybit', bybitCommands.bybit)

bot.action('bybitOI', bybitCommands.bybitOI)
bot.action('bybitOIsetup1', bybitCommands.bybitOIsetup1)
bot.action('bybitOIsetup2', bybitCommands.bybitOIsetup2)
bot.action('bybitOIsetup3', bybitCommands.bybitOIsetup3)

bot.action('bybitVolBoost', bybitCommands.bybitVolBoost)
bot.action('bybitVolBoostSetup1', bybitCommands.bybitVolBoostSetup1)
bot.action('bybitVolBoostSetup2', bybitCommands.bybitVolBoostSetup2)
bot.action('bybitVolBoostSetup3', bybitCommands.bybitVolBoostSetup3)

// OKX
bot.action('okx', okxCommands.okx)

// MEXC
bot.action('mexc', mexcCommands.mexc)
bot.action('mexcOI', mexcCommands.mexcOI)

module.exports = bot
