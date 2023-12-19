require('dotenv').config()
const { Telegraf } = require('telegraf')
const mainCommands = require('./commands/mainCommands')
const binanceCommands = require('./commands/binanceCommands')
const bybitCommands = require('./commands/bybitCommands')
const okxCommands = require('./commands/okxCommands')
const mexcCommands = require('./commands/mexcCommands')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(mainCommands.start)
bot.hears('🎛 Settings', mainCommands.settings)
bot.action('backToMain', mainCommands.backToMain)

// Binance
bot.action('binance', binanceCommands.binance)

bot.action('binanceOI', binanceCommands.binanceOI)
bot.action('binanceOIsetup1', binanceCommands.binanceOIsetup1)
bot.action('binanceOIsetup2', binanceCommands.binanceOIsetup2)
bot.action('binanceOIsetup3', binanceCommands.binanceOIsetup3)

bot.action('binanceVolBoost', binanceCommands.binanceVolBoost)
bot.action('binanceVolBoostSetup1', binanceCommands.binanceVolBoostSetup1)
bot.action('binanceVolBoostSetup2', binanceCommands.binanceVolBoostSetup2)
bot.action('binanceVolBoostSetup3', binanceCommands.binanceVolBoostSetup3)

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

bot.action('okxOI', okxCommands.okxOI)
bot.action('okxOIsetup1', okxCommands.okxOIsetup1)
bot.action('okxOIsetup2', okxCommands.okxOIsetup2)
bot.action('okxOIsetup3', okxCommands.okxOIsetup3)

bot.action('okxVolBoost', okxCommands.okxVolBoost)
bot.action('okxVolBoostSetup1', okxCommands.okxVolBoostSetup1)
bot.action('okxVolBoostSetup2', okxCommands.okxVolBoostSetup2)
bot.action('okxVolBoostSetup3', okxCommands.okxVolBoostSetup3)

// MEXC
bot.action('mexc', mexcCommands.mexc)

bot.action('mexcOI', mexcCommands.mexcOI)

bot.action('mexcVolBoost', mexcCommands.mexcVolBoost)
bot.action('mexcVolBoostSetup1', mexcCommands.mexcVolBoostSetup1)
bot.action('mexcVolBoostSetup2', mexcCommands.mexcVolBoostSetup2)
bot.action('mexcVolBoostSetup3', mexcCommands.mexcVolBoostSetup3)

module.exports = bot
