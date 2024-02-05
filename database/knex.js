// Update with your config settings.
require('dotenv').config({ path: './.env' })

const knex = require('knex')(require('../knexfile'))

module.exports = knex
