const { Markup } = require('telegraf')

const Keyboards = {
  alertTypes: () => Markup.inlineKeyboard([[Markup.button.callback('OI', 'oi')], [Markup.button.callback('Volume boost', 'volumeBoost')], [Markup.button.callback('⬅️ Back', 'backToMain')]]),
}

module.exports = Keyboards
