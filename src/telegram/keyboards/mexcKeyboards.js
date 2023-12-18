const { Markup } = require('telegraf')

const Keyboards = {
  alertTypes: () =>
    Markup.inlineKeyboard([
      [Markup.button.callback('OI', 'mexcOI')],
      [Markup.button.callback('Volume boost', 'mexcVolumeBoost')],
      [Markup.button.callback('⬅️ Back', 'backToMain')],
    ]),

  mexcOI: () =>
    Markup.inlineKeyboard([[Markup.button.callback('⬅️ Back', 'mexc')]]),
}

module.exports = Keyboards
