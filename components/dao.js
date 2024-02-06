const knex = require('../database/knex')
class Dao {
  constructor ({ tabela, campoPrimario, camposBusca, orderBy }) {
    this.tabela = tabela
    this.campoPrimario = campoPrimario
    this.camposBusca = camposBusca
    this.orderBy = orderBy
    this.db = knex
  }

  async salvar (dados) {
    const registro = await this.db(this.tabela)
      .insert(dados)
    return registro[0]
  }

  async alterar (registro) {
    await this.db(this.tabela)
      .where({ [this.campoPrimario]: registro[this.campoPrimario] })
      .update(registro)
    return true
  }

  async selecionar ({ id, modulo }) {
    const registros = await this.db(this.tabela)
      .select(
        '*'
      )
      .whereNull('deleted_at')
      .where(function () {
        if (modulo) this.where({ modulo })
      })
      .where({ [this.campoPrimario]: id })
    console.log({ registros })
    return registros[0]
  }

  async buscar (obj) {
    const registros = await this.db(this.tabela)
      .select(
        '*'
      )
      .whereNull('deleted_at')
      .where(obj)
    return registros[0]
  }

  async procurar ({ limit, page, busca, modulo, filtro }) {
    const self = this
    const registros = await this.db
      .select('*')
      .from(this.tabela)
      .whereNull('deleted_at')
      .where(function () {
        if (filtro) this.where(JSON.parse(filtro))
      })
      .where(function () {
        self.camposBusca.map((campo, indice) => {
          if (indice === 0) {
            return this.where(campo, 'like', `%${busca}%`)
          } else {
            return this.orWhere(campo, 'like', `%${busca}%`)
          }
        })
      })

      .orderBy(this.orderBy)
      .limit(limit)
      .offset(page)
    return registros
  }

  async listar ({ modulo }) {
    const registros = await this.db(this.tabela)
      .select('*')
      .whereNull('deleted_at')
      .where(function () {
        if (modulo) this.where({ modulo })
      })
      .orderBy(this.orderBy, 'desc')

    return registros
  }

  async apagar ({ usuarioLogado, id }) {
    await this.db(this.tabela)
      .where({ [this.campoPrimario]: id })
      .update({
        deleted_at: this.db.fn.now(),
        usuarioAlterador: usuarioLogado
      })
    return true
  }

  async reativar ({ id }) {
    await this.db(this.tabela)
      .where({ [this.campoPrimario]: id })
      .update({
        deleted_at: null
      })
    return true
  }
}
module.exports = Dao
