const { Markup } = require('telegraf')

const Keyboards = {
  alertTypes: () =>
    Markup.inlineKeyboard([
      [Markup.button.callback('OI', 'bybitOI')],
      [Markup.button.callback('Volume boost', 'bybitVolBoost')],
      [Markup.button.callback('⬅️ Back', 'backToMain')],
    ]),

  bybitOI: () =>
    Markup.inlineKeyboard([
      [Markup.button.callback('1.5% 1min', 'bybitOIsetup1')],
      [Markup.button.callback('3% 1min', 'bybitOIsetup2')],
      [Markup.button.callback('10% 5min', 'bybitOIsetup3')],
      [Markup.button.callback('↕️ Switch Side', 'bybitOIswitchDirection')],
      [Markup.button.callback('⬅️ Back', 'bybit')],
    ]),

  bybitVolBoost: () =>
    Markup.inlineKeyboard([
      [Markup.button.callback('8X / 100min', 'bybitVolBoostSetup1')],
      [Markup.button.callback('12X / 100min', 'bybitVolBoostSetup2')],
      [Markup.button.callback('20X / 100min', 'bybitVolBoostSetup3')],
      [Markup.button.callback('20X / 20min', 'bybitVolBoostSetup4')],
      [Markup.button.callback('1X / 1min', 'bybitVolBoostSetup5')],
      [Markup.button.callback('⬅️ Back', 'bybit')],
    ]),
}

module.exports = Keyboards
