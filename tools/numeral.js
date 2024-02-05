const numeralJs = require('numeral')
numeralJs.register('locale', 'pt-br', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  abbreviations: {
    thousand: 'mil',
    million: 'milhões',
    billion: 'b',
    trillion: 't'
  },
  ordinal: function (number) {
    return 'º'
  },
  currency: {
    symbol: 'R$'
  }
})
numeralJs.locale('pt-br')
module.exports = function () {
  return numeralJs
}
