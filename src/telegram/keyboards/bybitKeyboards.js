const { Markup } = require('telegraf')

const Keyboards = {
  alertTypes: () => Markup.inlineKeyboard([[Markup.button.callback('OI', 'bybitOI')], [Markup.button.callback('Volume boost', 'bybitVolBoost')], [Markup.button.callback('⬅️ Back', 'backToMain')]]),

  bybitOI: () =>
    Markup.inlineKeyboard([
      [Markup.button.callback('1.5% 1min', 'bybitOIsetup1')],
      [Markup.button.callback('3% 1min', 'bybitOIsetup2')],
      [Markup.button.callback('10% 5min', 'bybitOIsetup3')],
      [Markup.button.callback('0', 'bybitOIsetup1'), Markup.button.callback('50K', 'bybitOIsetup2'), Markup.button.callback('100K', 'bybitOIsetup3'), Markup.button.callback('250K', 'bybitOIsetup3')],
      [Markup.button.callback('LONG', 'bybitOIsetup1'), Markup.button.callback('SHORT', 'bybitOIsetup2')],
      [Markup.button.callback('⬅️ Back', 'bybit')],
    ]),

  bybitVolBoost: () => Markup.inlineKeyboard([[Markup.button.callback('⬅️ Back', 'bybit')]]),
}

module.exports = Keyboards
