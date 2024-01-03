const { Markup } = require('telegraf')

const Keyboards = {
  exchanges: () =>
    Markup.inlineKeyboard([
      [Markup.button.callback('Binance', 'binance')],
      [Markup.button.callback('Bybit', 'bybit')],
      [Markup.button.callback('OKX', 'okx')],
      [Markup.button.callback('MEXC', 'mexc')],
    ]),
}

module.exports = Keyboards
