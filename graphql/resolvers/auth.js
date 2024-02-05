const Auth = require('../../components/auth/auth')

module.exports = {

  Mutation: {
    signup: Auth.signup,
    login: Auth.login
  }
}
