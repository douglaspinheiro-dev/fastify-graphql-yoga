const dayjs = require('dayjs') // dayjsJS
dayjs.locale('pt-br')

const formataBancoData = function (value) {
  if (value === null) return false
  if (value.length !== 10) {
    return false
  }
  let data = value.split('/')
  data = data[2] + '-' + data[1] + '-' + data[0]
  if (dayjs(data).isValid()) {
    return data
  }
}
module.exports = function () {
  return formataBancoData
}
