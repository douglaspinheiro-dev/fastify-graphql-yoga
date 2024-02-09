const tools = require('../tools')
const dataSource = require('./dataSource')

module.exports = class Model {
  constructor ({
    modulo
  }) {
    this.modulo = modulo
    this.dataSource = dataSource
  }

  listar ({ modulo }) {
    return this.dataSource[this.modulo].listar({ modulo })
  }

  async procurar ({ limit, page, busca, filtro }) {
    const resultado = await this.dataSource[this.modulo].procurar({
      limit,
      page,
      busca,
      filtro,
      modulo: this.modulo
    })
    return tools.formataPaginacao(resultado, limit)
  }

  selecionar ({ id }) {
    return this.dataSource[this.modulo].selecionar({ id })
  }

  async gravar ({ registro }) {
    const id = await this.dataSource[this.modulo].salvar(registro)
    registro[this.modulo] = id
    return registro
  }

  async alterar ({ registro }) {
    await this.dataSource[this.modulo].alterar(registro)
    return true
  }

  async excluir ({ id }) {
    await this.dataSource[this.modulo].apagar({ id })
    return true
  }

  async reativar ({ id, usuarioLogado }) {
    await this.dataSource[this.modulo].reativar({
      id,
      usuarioLogado
    })
    return true
  }
}
