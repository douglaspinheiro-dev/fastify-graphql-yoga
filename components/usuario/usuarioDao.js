class UsuarioDao {
  constructor (knex) {
    this.db = knex
    this.tabela = 'usuarios'
    this.campoPrimario = 'usuario'
    this.camposBusca = ['nome', 'telegram', 'email']
    this.orderBy = 'nome'
    this.Resposta = {
      mensagem: ''
    }
  }

  async reativa ({ id }) {
    await this.db(this.tabela)
      .where({ usuario: id })
      .update({
        deleted_at: null
      })
    return true
  }
}

module.exports = new UsuarioDao()
