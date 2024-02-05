const knex = require('../../../database/knex')

const UsuarioAPI = require('../../../components/usuario/dataSource')

module.exports = {
  usuarioDao: new UsuarioAPI(knex)
}
