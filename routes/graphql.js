'use strict'
const { createYoga } = require('graphql-yoga')
const { useSofa } = require('@graphql-yoga/plugin-sofa')

const { costLimitPlugin } = require('@escape.tech/graphql-armor-cost-limit')
const { maxAliasesPlugin } = require('@escape.tech/graphql-armor-max-aliases')
const { maxDepthPlugin } = require('@escape.tech/graphql-armor-max-depth')
const { maxDirectivesPlugin } = require('@escape.tech/graphql-armor-max-directives')
const { maxTokensPlugin } = require('@escape.tech/graphql-armor-max-tokens')
const { useResponseCache } = require('@graphql-yoga/plugin-response-cache')

const {

  schema,
  dataSources,
  getSession

} = require('../graphql/config')

module.exports = async function (app, opts) {
  const yoga = createYoga({
    context: context => ({ // Context factory gets called for every request
      session: getSession(context),
      dataSources
    }),
    graphiql: true,

    graphqlEndpoint: '/graphql',
    landingPage: false,
    schema,
    // Integrate Fastify logger
    logging: {
      debug: (...args) => args.forEach(arg => app.log.debug(arg)),
      info: (...args) => args.forEach(arg => app.log.info(arg)),
      warn: (...args) => args.forEach(arg => app.log.warn(arg)),
      error: (...args) => args.forEach(arg => app.log.error(arg))
    },
    plugins: [
      costLimitPlugin(),
      maxTokensPlugin(),
      maxDepthPlugin(),
      maxDirectivesPlugin(),
      maxAliasesPlugin(),
      useResponseCache({
        // global cache
        session: () => null
      }),
      useSofa({
        basePath: '/rest',
        swaggerUI: {
          endpoint: '/swagger'
        },
        title: 'Example API',
        version: '1.0.0'
      })
    ]
  })

  /**
   * We pass the incoming HTTP request to GraphQL Yoga
   * and handle the response using Fastify's `reply` API
   * Learn more about `reply` https://www.fastify.io/docs/latest/Reply/
   **/

  app.route({
    // Bind to the Yoga's endpoint to avoid rendering on any path
    url: yoga.graphqlEndpoint,
    method: ['GET', 'POST', 'OPTIONS'],
    handler: async (req, reply) => {
      // Second parameter adds Fastify's `req` and `reply` to the GraphQL Context
      const response = await yoga.handleNodeRequest(req, {
        req,
        reply
      })
      response.headers.forEach((value, key) => {
        reply.header(key, value)
      })

      reply.status(response.status)

      reply.send(response.body)

      return reply
    }
  })
}
