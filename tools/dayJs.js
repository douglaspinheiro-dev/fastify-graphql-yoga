const ptBr = require('dayjs/locale/pt-br')
const dayJs = require('dayjs')
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
const duration = require('dayjs/plugin/duration')
dayJs.extend(duration)
dayJs.locale('pt-br', ptBr)
dayJs.extend(isSameOrAfter)
module.exports = dayJs
