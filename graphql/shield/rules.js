const { rule, inputRule, allow, deny, and, chain, race, or, not } = require('graphql-shield')

const isAuthenticated = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  return ctx.session !== null
})

module.exports = {
  rule,
  inputRule,
  allow,
  deny,
  and,
  chain,
  race,
  or,
  not,
  isAuthenticated
}
