const { shield } = require('graphql-shield')
const { isAuthenticated, not } = require('./rules')

const permissions = shield({
  Query: {
    '*': isAuthenticated
  },
  Mutation: {
    '*': isAuthenticated,
    login: not(isAuthenticated),
    signup: not(isAuthenticated)
  }
}, {
  debug: true,
  allowExternalErrors: true,
  fallbackError: true
})

module.exports = permissions
