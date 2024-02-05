const tools = require('../tools')
module.exports = class Model {
  constructor ({
    modulo,
    dao
  }) {
    this.tools = tools
    this.modulo = modulo
    this.dao = dao
  }

  listar (root, params, { dataSources, session, modulo }, info) {
    return dataSources[this.dao].lista({ modulo })
  }

  procurar (root, { busca }, { dataSources, session, modulo }, info) {
    return dataSources[this.dao].procura({
      limit: busca.fim,
      page: busca.inicio,
      busca: busca.busca,
      filtro: busca.filtro,
      modulo
    }).then(resultado => this.tools.formataPaginacao(resultado, busca.fim))
  }

  selecionar (root, params, context, info) {
    const id = root ? root[this.modulo] : params[this.modulo]
    return context.dataSources[this.dao].seleciona({
      id
    })
  }

  gravar (root, params, { dataSources }, info) {
    const registro = params[this.modulo]

    return dataSources[this.dao].salva(registro)
      .then(id => {
        registro[this.modulo] = id
        return registro
      })
  }

  alterar (root, params, { dataSources }, info) {
    const registro = params[this.modulo]

    return dataSources[this.dao]
      .altera(registro)
      .then(() => true)
  }

  excluir (root, { id }, { dataSources }, info) {
    return dataSources[this.dao].apaga({
      id
    }).then(() => true)
  }
}
