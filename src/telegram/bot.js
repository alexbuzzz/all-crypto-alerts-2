require('dotenv').config()
const { Telegraf } = require('telegraf')
const mainCommands = require('./commands/mainCommands')
const binanceCommands = require('./commands/binanceCommands')
const bybitCommands = require('./commands/bybitCommands')
const okxCommands = require('./commands/okxCommands')
const mexcCommands = require('./commands/mexcCommands')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(mainCommands.start)
bot.hears('/test', mainCommands.test)
bot.hears('/filters', mainCommands.filters)
bot.hears('/settings', mainCommands.settings)
bot.hears('🎛 Settings', mainCommands.settings)
bot.action('backToMain', mainCommands.backToMain)

// Vol Filters
bot.hears(/binance_oi_(\d+)/i, mainCommands.binanceOI)
bot.hears(/binance_oi_([A-Za-z]+)_(\d+)/i, mainCommands.binanceOISymbol)
bot.hears(/binance_vol_boost_(\d+)/i, mainCommands.binanceVolBoost)
bot.hears(
  /binance_vol_boost_([A-Za-z]+)_(\d+)/i,
  mainCommands.binanceVolBoostSymbol
)

bot.hears(/bybit_oi_(\d+)/i, mainCommands.bybitOI)
bot.hears(/bybit_oi_([A-Za-z]+)_(\d+)/i, mainCommands.bybitOISymbol)
bot.hears(/bybit_vol_boost_(\d+)/i, mainCommands.bybitVolBoost)
bot.hears(
  /bybit_vol_boost_([A-Za-z]+)_(\d+)/i,
  mainCommands.bybitVolBoostSymbol
)

bot.hears(/okx_oi_(\d+)/i, mainCommands.okxOI)
bot.hears(/okx_oi_([A-Za-z]+)_(\d+)/i, mainCommands.okxOISymbol)
bot.hears(/okx_vol_boost_(\d+)/i, mainCommands.okxVolBoost)
bot.hears(/okx_vol_boost_([A-Za-z]+)_(\d+)/i, mainCommands.okxVolBoostSymbol)

bot.hears(/mexc_vol_boost_(\d+)/i, mainCommands.mexcVolBoost)
bot.hears(/mexc_vol_boost_([A-Za-z]+)_(\d+)/i, mainCommands.mexcVolBoostSymbol)

bot.hears(/make_all_(\d+)/i, mainCommands.makeAllFiltersAs)

// Binance
bot.action('binance', binanceCommands.binance)

bot.action('binanceOI', binanceCommands.binanceOI)
bot.action('binanceOIsetup1', binanceCommands.binanceOIsetup1)
bot.action('binanceOIsetup2', binanceCommands.binanceOIsetup2)
bot.action('binanceOIsetup3', binanceCommands.binanceOIsetup3)
bot.action('binanceOIswitchDirection', binanceCommands.binanceOIswitchDirection)

bot.action('binanceVolBoost', binanceCommands.binanceVolBoost)
bot.action('binanceVolBoostSetup1', binanceCommands.binanceVolBoostSetup1)
bot.action('binanceVolBoostSetup2', binanceCommands.binanceVolBoostSetup2)
bot.action('binanceVolBoostSetup3', binanceCommands.binanceVolBoostSetup3)
bot.action('binanceVolBoostSetup4', binanceCommands.binanceVolBoostSetup4)
bot.action('binanceVolBoostSetup5', binanceCommands.binanceVolBoostSetup5)

// Bybit
bot.action('bybit', bybitCommands.bybit)

bot.action('bybitOI', bybitCommands.bybitOI)
bot.action('bybitOIsetup1', bybitCommands.bybitOIsetup1)
bot.action('bybitOIsetup2', bybitCommands.bybitOIsetup2)
bot.action('bybitOIsetup3', bybitCommands.bybitOIsetup3)
bot.action('bybitOIswitchDirection', bybitCommands.bybitOIswitchDirection)

bot.action('bybitVolBoost', bybitCommands.bybitVolBoost)
bot.action('bybitVolBoostSetup1', bybitCommands.bybitVolBoostSetup1)
bot.action('bybitVolBoostSetup2', bybitCommands.bybitVolBoostSetup2)
bot.action('bybitVolBoostSetup3', bybitCommands.bybitVolBoostSetup3)
bot.action('bybitVolBoostSetup4', bybitCommands.bybitVolBoostSetup4)
bot.action('bybitVolBoostSetup5', bybitCommands.bybitVolBoostSetup5)

// OKX
bot.action('okx', okxCommands.okx)

bot.action('okxOI', okxCommands.okxOI)
bot.action('okxOIsetup1', okxCommands.okxOIsetup1)
bot.action('okxOIsetup2', okxCommands.okxOIsetup2)
bot.action('okxOIsetup3', okxCommands.okxOIsetup3)
bot.action('okxOIswitchDirection', okxCommands.okxOIswitchDirection)

bot.action('okxVolBoost', okxCommands.okxVolBoost)
bot.action('okxVolBoostSetup1', okxCommands.okxVolBoostSetup1)
bot.action('okxVolBoostSetup2', okxCommands.okxVolBoostSetup2)
bot.action('okxVolBoostSetup3', okxCommands.okxVolBoostSetup3)
bot.action('okxVolBoostSetup4', okxCommands.okxVolBoostSetup4)
bot.action('okxVolBoostSetup5', okxCommands.okxVolBoostSetup5)

// MEXC
bot.action('mexc', mexcCommands.mexc)

bot.action('mexcOI', mexcCommands.mexcOI)

bot.action('mexcVolBoost', mexcCommands.mexcVolBoost)
bot.action('mexcVolBoostSetup1', mexcCommands.mexcVolBoostSetup1)
bot.action('mexcVolBoostSetup2', mexcCommands.mexcVolBoostSetup2)
bot.action('mexcVolBoostSetup3', mexcCommands.mexcVolBoostSetup3)
bot.action('mexcVolBoostSetup4', mexcCommands.mexcVolBoostSetup4)
bot.action('mexcVolBoostSetup5', mexcCommands.mexcVolBoostSetup5)

module.exports = bot
