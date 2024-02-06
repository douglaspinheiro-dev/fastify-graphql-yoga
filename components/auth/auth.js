const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { GraphQLError } = require('graphql')

const dataSource = require('../dataSource')
class Auth {
  async signup (parent, args, context, info) {
    // confere se ja existe usuario com este email
    const existeEmail = await dataSource.usuario.existeEmail(args.email)
    console.log('existeEmail', existeEmail)
    if (existeEmail) throw new GraphQLError('Email já existe')

    // 1
    const senha = await bcrypt.hash(args.senha, 10)
    // 2
    const id = await dataSource.usuario.salva({ ...args, senha })
    // 3
    const usuario = {
      ...args, usuario: id
    }
    const token = jwt.sign(usuario, process.env.SECRET_KEY)
    // 4
    return {
      token,
      usuario
    }
  }

  async login (parent, args, context, info) {
    // 1
    const usuario = await dataSource.usuario.buscar({ email: args.email })
    if (!usuario) {
      throw new GraphQLError('Nenhum usuário encontrado')
    }

    // 2
    const valid = await bcrypt.compare(args.senha, usuario.senha)
    if (!valid) {
      throw new GraphQLError('Senha Inválida')
    }

    const token = jwt.sign(usuario, process.env.SECRET_KEY)

    // 3
    return {
      token,
      usuario
    }
  }
}

module.exports = new Auth()
