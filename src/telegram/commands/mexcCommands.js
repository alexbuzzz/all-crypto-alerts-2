const mexcKeyboards = require('../keyboards/mexcKeyboards')

const commands = {
  // MEXC
  mexc: (ctx) => {
    ctx.editMessageText('Select alert type:', mexcKeyboards.alertTypes())
  },
}

module.exports = commands
