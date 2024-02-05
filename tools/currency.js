// import something here
const currency = require('currency.js')
// leave the export, even if you don't use it

const Real = value => currency(value, {
  symbol: '',
  separator: '',
  decimal: ',',
  formatWithSymbol: false,
  errorOnInvalid: false,
  precision: 2,
  pattern: '!#',
  negativePattern: '-!#'
})
module.exports = Real
