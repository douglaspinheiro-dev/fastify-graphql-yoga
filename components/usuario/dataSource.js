const Dao = require('../dataSource')
class UsuarioAPI extends Dao {
  constructor (knex) {
    super({
      knex,
      tabela: 'usuarios',
      campoPrimario: 'usuario',
      camposBusca: ['nome', 'telegram', 'email'],
      orderBy: 'nome'
    })
    this.Resposta = {
      mensagem: ''
    }
  }

  async alteraToken ({ usuario, token }) {
    await this.db(this.tabela)
      .where({ usuario })
      .update(token)
    return true
  }

  async alteraSenha ({ usuario, senha }) {
    await this.db(this.tabela)
      .where({ usuario })
      .update({
        senha
      })
    return true
  }

  async buscaLogin (email) {
    const registros = await this.db(this.tabela)
      .select(
        'usuario',
        'email'
      )
      .where({ email })
    return registros
  }

  async existeEmail (email) {
    const registros = await this.db(this.tabela)
      .select(
        'email'
      )
      .where({ email })
    console.log('registros', registros.length)
    return registros > 0
  }

  async consultaEmailToken ({ email, token }) {
    const registros = await this.db(this.tabela)
      .select(
        'usuario',
        'email',
        'token'
      ).where({ email, token })
    return registros
  }

  async consultaUsuarioToken ({ usuario, token }) {
    const registros = await this.db(this.tabela)
      .select(
        'usuario',
        'email',
        'token'
      ).where({ usuario, token })
    return registros
  }

  async alteraSenhaToken ({ usuario, senha, token }) {
    const registros = await this.db(this.tabela)
      .where({ usuario, token })
      .update({ senha })
    return registros
  }

  async ativaTwa (usuario) {
    const registros = await this.db(this.tabela)
      .where({ usuario })
      .update({ twa: 1 })
    return registros
  }

  async desativaTwa (usuario) {
    const registros = await this.db(this.tabela)
      .where({ usuario })
      .update({ twa: 0 })
    return registros
  }

  async buscaPorNome ({ busca, limit, page }) {
    const registros = await this.db(this.tabela)
      .select(
        'usuario',
        'nome'
      )
      .where('nome', 'like', `%${busca}%`)
      .whereNull('deleted_at')
      .orderBy('nome')
      .limit(limit)
      .offset(page)

    return registros
  }

  async reativa ({ id }) {
    await this.db(this.tabela)
      .where({ usuario: id })
      .update({
        deleted_at: null
      })
    return true
  }

  async salvaUltimoLogin (dados) {
    const registros = await this.db('ultimosLogins')
      .insert(dados)

    return registros[0]
  }

  async validar (dadosLogin) {
    const registros = await this.db(this.tabela)
      .select(
        'usuario',
        'empresaLogada'
      ).where(dadosLogin)
    return registros[0]
  }
}

module.exports = UsuarioAPI
