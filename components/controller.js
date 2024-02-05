const ExisteRegistroError = require('./erros/registroExiste')
const validaCampoDuplicado = (err, campoUnico) => {
  console.log('VALIDA CAMPO DUPLICADO', err, campoUnico)
  const texto = err.toString()
  if (texto.includes('ER_DUP_ENTRY')) return new ExisteRegistroError(campoUnico)
  return err
}
class Controller {
  constructor (obj) {
    console.log({ obj })
    this.model = obj.model
    this.modulo = obj.modulo
    this.moduloId = obj.moduloId
    this.campoUnico = obj.campoUnico
  }

  gravar (root, params, context, info) {
    console.log({ root, params, context, info })
    context.modulo = this.modulo
    return this.model.gravar(root, params, context, info)
      .catch(err => validaCampoDuplicado(err, this.campoUnico))
  }

  listar (root, params, context, info) {
    console.log({ this: this, context })
    context.modulo = this.modulo
    return this.model.listar(root, params, context, info)
  }

  selecionar (root, params, context, info) {
    context.modulo = this.modulo
    return this.model.selecionar(root, params, context, info)
  }

  procurar (root, params, context, info) {
    context.modulo = this.modulo
    return this.model.procurar(root, params, context, info)
  }

  alterar (root, params, context, info) {
    context.modulo = this.modulo
    return this.model.alterar(root, params, context, info)
      .catch(err => validaCampoDuplicado(err, this.campoUnico))
  }

  alterarNivel (root, params, context, info) {
    context.modulo = this.modulo
    return this.model.alterarNivel(root, params, context, info)
  }

  excluir (root, params, context, info) {
    context.modulo = this.modulo
    return this.model.excluir(root, params, context, info)
  }

  reativar (root, params, context, info) {
    context.modulo = this.modulo
    return this.model.reativar(root, params, context, info)
  }
}

module.exports = Controller
