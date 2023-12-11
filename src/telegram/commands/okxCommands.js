const okxKeyboards = require('../keyboards/okxKeyboards')

const commands = {
  // OKX
  okx: (ctx) => {
    ctx.editMessageText('Select alert type:', okxKeyboards.alertTypes())
  },
}

module.exports = commands
