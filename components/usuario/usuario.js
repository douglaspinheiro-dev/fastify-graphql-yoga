const Model = require('../model')
const bcrypt = require('bcryptjs')

// const loginDao = require('../login/loginDao')
class Usuario extends Model {
  constructor () {
    super({
      modulo: 'usuario',
      dao: 'usuarioDao'

    })
  }

  async gravar (root, { usuario }, { session, dataSources }, info) {
    usuario.senha = await bcrypt.hash(usuario.senha, 10)
    return dataSources.usuarioDao.salva(usuario)
      .then(id => {
        usuario.usuario = id
        return usuario
      })
  }

  alterar (root, { usuario, acessoEmpresa }, { session, dataSources }, info) {
    return dataSources.usuarioDao.altera(usuario)
      .then(() => true)
  }

  reativar (root, { id }, { session, dataSources }, info) {
    return dataSources.usuarioDao.reativa({
      id,
      usuarioLogado: session.usuarioLogado
    }).then(() => true)
  }

  // alterarSenha(root, { senhaAtual, senhaNova }, { session, dataSources }, info) {
  //   return loginDao.valida({
  //     login: session.login,
  //     senha: senhaAtual
  //   }).then(resultado => {

  //     if (!resultado.length) return false
  //     let loginBanco = resultado[0].login
  //     let senhaBanco = resultado[0].senha
  //     return loginBanco === session.login && senhaBanco === senhaAtual
  //   }).then(valido => {
  //     if (!valido) return false
  //     return dataSources.usuarioDao.alteraSenha({
  //       usuario: session.usuarioLogado,
  //       senha: senhaNova,
  //       usuarioAlterador: session.usuarioLogado
  //     }).then(() => true)
  //   })
  // }

  async alterarSenhaOutroUsuario (root, { usuario, senha }, { session, dataSources }, info) {
    return dataSources.usuarioDao.alteraSenha({
      usuario,
      senha: await bcrypt.hash(senha, 10)
    }).then(() => true)
  }

  buscarLogin (root, { login }, { dataSources }, info) {
    return dataSources.usuarioDao.buscaLogin(login)
  }
}
module.exports = new Usuario({
  modulo: 'usuario',
  tabela: 'usuarios',
  model: require('./usuario'),
  campoUnico: 'email'

})
