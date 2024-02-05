const usuarioController = require('../../components/usuario/usuarioController')
// root, params, context, info

module.exports = {
  Query: {
    usuarioProcurar: (r, p, c, i) => usuarioController.procurar(r, p, c, i),
    usuarioSelecionar: (r, p, c, i) => usuarioController.selecionar(r, p, c, i)
  },
  Mutation: {
    usuarioGravar: (r, p, c, i) => usuarioController.gravar(r, p, c, i),
    usuarioAlterar: (r, p, c, i) => usuarioController.alterar(r, p, c, i),
    usuarioAlterarSenha: (r, p, c, i) => usuarioController.alterarSenha(r, p, c, i),
    usuarioAlterarSenhaOutroUsuario: (r, p, c, i) => usuarioController.alterarSenhaOutroUsuario(r, p, c, i),
    usuarioExcluir: (r, p, c, i) => usuarioController.excluir(r, p, c, i),
    usuarioReativar: (r, p, c, i) => usuarioController.reativar(r, p, c, i)

  }
}
