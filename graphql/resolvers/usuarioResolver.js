const usuarioController = require('../../components/usuario/usuarioController')
// root, params, context, info

module.exports = {
  Query: {
    usuarioProcurar: (root, params, context, info) => usuarioController.procurar(root, params, context, info),
    usuarioSelecionar: (root, params, context, info) => usuarioController.selecionar(root, params, context, info)
  },
  Mutation: {
    usuarioGravar: (root, params, context, info) => usuarioController.gravar(root, params, context, info),
    usuarioAlterar: (root, params, context, info) => usuarioController.alterar(root, params, context, info),
    usuarioExcluir: (root, params, context, info) => usuarioController.excluir(root, params, context, info),
    usuarioReativar: (root, params, context, info) => usuarioController.reativar(root, params, context, info)

  }
}
