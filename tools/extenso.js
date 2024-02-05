// import something here
const extensoJs = require('extenso')

// leave the export, even if you don't use it

const extenso = value => extensoJs(value, {
  mode: 'currency',
  currency: {
    type: 'BRL'
  }
})
module.exports = extenso
