const { Markup } = require('telegraf')

const Keyboards = {
  alertTypes: () =>
    Markup.inlineKeyboard([
      [Markup.button.callback('OI', 'okxOI')],
      [Markup.button.callback('Volume boost', 'okxVolBoost')],
      [Markup.button.callback('⬅️ Back', 'backToMain')],
    ]),

  okxOI: () =>
    Markup.inlineKeyboard([
      [Markup.button.callback('1.5% 1min', 'okxOIsetup1')],
      [Markup.button.callback('3% 1min', 'okxOIsetup2')],
      [Markup.button.callback('10% 5min', 'okxOIsetup3')],
      [Markup.button.callback('↕️ Switch Side', 'okxOIswitchDirection')],
      [Markup.button.callback('⬅️ Back', 'okx')],
    ]),

  okxVolBoost: () =>
    Markup.inlineKeyboard([
      [Markup.button.callback('8X / 100min', 'okxVolBoostSetup1')],
      [Markup.button.callback('12X / 100min', 'okxVolBoostSetup2')],
      [Markup.button.callback('20X / 100min', 'okxVolBoostSetup3')],
      [Markup.button.callback('20X / 20min', 'okxVolBoostSetup4')],
      [Markup.button.callback('1X / 1min', 'okxVolBoostSetup5')],
      [Markup.button.callback('⬅️ Back', 'okx')],
    ]),
}

module.exports = Keyboards
