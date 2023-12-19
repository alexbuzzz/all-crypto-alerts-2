const { Markup } = require('telegraf')

const Keyboards = {
  alertTypes: () =>
    Markup.inlineKeyboard([
      [Markup.button.callback('OI', 'mexcOI')],
      [Markup.button.callback('Volume boost', 'mexcVolBoost')],
      [Markup.button.callback('⬅️ Back', 'backToMain')],
    ]),

  mexcOI: () =>
    Markup.inlineKeyboard([[Markup.button.callback('⬅️ Back', 'mexc')]]),

  mexcVolBoost: () =>
    Markup.inlineKeyboard([
      [Markup.button.callback('5X / 100min', 'mexcVolBoostSetup1')],
      [Markup.button.callback('8X / 100min', 'mexcVolBoostSetup2')],
      [Markup.button.callback('12X / 100min', 'mexcVolBoostSetup3')],
      [Markup.button.callback('⬅️ Back', 'mexc')],
    ]),
}

module.exports = Keyboards
