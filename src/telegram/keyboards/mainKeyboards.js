const { Markup } = require('telegraf')

const Keyboards = {
  settings: () => ({
    reply_markup: {
      keyboard: [[{ text: '🎛 Settings' }]],
      resize_keyboard: true,
    },
  }),

  exchanges: () => Markup.inlineKeyboard([[Markup.button.callback('Bybit', 'bybit')], [Markup.button.callback('OKX', 'okx')], [Markup.button.callback('MEXC', 'mexc')]]),
}

module.exports = Keyboards
