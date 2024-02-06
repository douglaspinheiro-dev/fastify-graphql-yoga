const Dao = require('../dao')

module.exports = new Dao({
  tabela: 'usuarios',
  campoPrimario: 'usuario',
  camposBusca: ['nome', 'telegram', 'email'],
  orderBy: 'nome'
})
