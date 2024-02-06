/**
 * A funcao do controller aqui é fazer a interface entre o model com o framework.
 * Entao ele pega os campos necessarios e envia para o model trabalhar o banco.
 */
const UsuarioModel = require('./usuarioModel')
const Controller = require('../controller')
const modulo = 'usuario'
const model = new UsuarioModel({ modulo })
module.exports = new Controller({
  modulo,
  model
})
