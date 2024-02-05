const { makeExecutableSchema } = require('@graphql-tools/schema')
const dataSources = require('./dataSources/sql')
const typeDefs = require('./typeDefs.js')
const resolvers = require('./resolvers.js')
const permissions = require('./shield/permissions.js')
const { applyMiddleware } = require('graphql-middleware')
let schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

schema = applyMiddleware(schema, permissions)

const jwt = require('jsonwebtoken')

function getSession (context) {
  if (context.req) {
    const authHeader = context.req.headers.authorization
    if (!authHeader) return null
    const token = authHeader.replace('Bearer ', '')
    if (token == null) return null
    return jwt.verify(token, process.env.SECRET_KEY)
  }
}

module.exports = {

  schema,
  dataSources,
  getSession

}
