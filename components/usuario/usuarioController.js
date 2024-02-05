const Controller = require('../controller')

const Usuario = require('./usuario')
class UsuarioController extends Controller {
  inserirAcessoEmpresa () {
    return (root, params, context, info) => Usuario.inserirAcessoEmpresa(root, params, context, info)
      .catch(err => {
        throw new Error('Erro ao selecionar responsaveis do cliente contato', err)
      })
  }

  removerAcessoEmpresa () {
    return (root, params, context, info) => Usuario.removerAcessoEmpresa(root, params, context, info)
      .catch(err => {
        throw new Error('Erro ao selecionar responsaveis do cliente contato', err)
      })
  }

  alterarSenha () {
    // return combineResolvers(
    return (root, params, context, info) => Usuario.alterarSenha(root, params, context, info)
      .catch(err => {
        console.log('erro', err)
        throw new Error('Erro ao alterarSenha', err)
      })
    // )
  }

  alterarSenhaOutroUsuario () {
    return (root, params, context, info) => Usuario.alterarSenhaOutroUsuario(root, params, context, info)
      .catch(err => {
        console.log({ err })
        throw new Error('Erro ao alterarSenhaOutroUsuario', err)
      })
  }

  buscarLogin () {
    return (root, params, context, info) => Usuario.buscarLogin(root, params, context, info)
      .catch(err => {
        throw new Error('Erro ao buscarLogin', err)
      })
  }

  buscaEmpresasDisponiveis () {
    return (root, params, context, info) => Usuario.buscaEmpresasDisponiveis(root, params, context, info)
      .catch(err => {
        throw new Error('Erro ao buscaEmpresasDisponiveis', err)
      })
  }

  buscaEmpresasPermitidas () {
    return (root, params, context, info) => Usuario.buscaEmpresasPermitidas(root, params, context, info)
      .catch(err => {
        console.log('erro', err)
        throw new Error('Erro ao buscaEmpresasPermitidas', err)
      })
  }

  buscaEmpresaLogada () {
    return (root, params, context, info) => Usuario.buscaEmpresaLogada(root, params, context, info)
      .catch(err => {
        console.log('errro', err)
        throw new Error('Erro ao reativar' + 'usuario')
      })
  }

  selecionaGrupoUsuario () {
    return (root, params, context, info) => Usuario.selecionaGrupoUsuario(root, params, context, info)
      .catch(err => {
        console.log('errro', err)
        throw new Error('Erro ao selecionar grupo Usuario' + 'usuario')
      })
  }
}

const usuarioController = new UsuarioController({
  modulo: 'usuario',
  tabela: 'usuarios',
  model: require('./usuario'),
  campoUnico: 'email'

})

module.exports = usuarioController
