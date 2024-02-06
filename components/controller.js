/**
 * A funcao do controller aqui é fazer a interface entre o model com o framework.
 * Entao ele pega os campos necessarios e envia para o model trabalhar o banco.
 */
module.exports = class Controller {
  constructor ({
    modulo,
    model
  }) {
    this.modulo = modulo
    this.model = model
  }

  listar (root, params, { session }, info) {
    return this.model.listar()
  }

  procurar (root, { busca }, context, info) {
    return this.model.procurar({
      limit: busca.fim,
      page: busca.inicio,
      busca: busca.busca,
      filtro: busca.filtro
    })
  }

  selecionar (root, params, context, info) {
    const id = root ? root[this.modulo] : params[this.modulo]
    return this.model.selecionar({
      id
    })
  }

  gravar (root, params, context, info) {
    const registro = params[this.modulo]
    return this.model.salvar({ registro })
  }

  alterar (root, params, context, info) {
    const registro = params[this.modulo]

    return this.model
      .alterar({ registro })
  }

  excluir (root, { id }, context, info) {
    return this.model.apaga({
      id
    })
  }

  reativar (root, { id }, { session }, info) {
    return this.model.reativa({
      id,
      usuarioLogado: session.usuarioLogado

    })
  }
}
