const mexcKeyboards = require('../keyboards/mexcKeyboards')

const commands = {
  // MEXC
  mexc: (ctx) => {
    ctx.editMessageText('Select alert type:', mexcKeyboards.alertTypes())
  },

  // MEXC OI
  mexcOI: (ctx) => {
    ctx.editMessageText('Not available yet...', mexcKeyboards.mexcOI())
  },
}

module.exports = commands
