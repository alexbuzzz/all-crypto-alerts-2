const { Markup } = require('telegraf')

const Keyboards = {
  alertTypes: () =>
    Markup.inlineKeyboard([
      [Markup.button.callback('OI', 'binanceOI')],
      [Markup.button.callback('Volume boost', 'binanceVolBoost')],
      [Markup.button.callback('⬅️ Back', 'backToMain')],
    ]),

  binanceOI: () =>
    Markup.inlineKeyboard([
      [Markup.button.callback('1.5% 1min', 'binanceOIsetup1')],
      [Markup.button.callback('3% 1min', 'binanceOIsetup2')],
      [Markup.button.callback('10% 5min', 'binanceOIsetup3')],
      [Markup.button.callback('⬅️ Back', 'binance')],
    ]),

  binanceVolBoost: () =>
    Markup.inlineKeyboard([
      [Markup.button.callback('5X / 100min', 'binanceVolBoostSetup1')],
      [Markup.button.callback('8X / 100min', 'binanceVolBoostSetup2')],
      [Markup.button.callback('12X / 100min', 'binanceVolBoostSetup3')],
      [Markup.button.callback('⬅️ Back', 'binance')],
    ]),
}

module.exports = Keyboards
