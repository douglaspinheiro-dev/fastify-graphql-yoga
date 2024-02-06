const Model = require('../model')
const bcrypt = require('bcryptjs')

// const loginDao = require('../login/loginDao')
class UsuarioModel extends Model {
  async gravar ({ registro }) {
    registro.senha = await bcrypt.hash(registro.senha, 10)
    return super.gravar({ registro })
  }

  async alterar ({ registro }) {
    registro.senha = await bcrypt.hash(registro.senha, 10)
    return super.alterar({ registro })
  }
}
module.exports = UsuarioModel
