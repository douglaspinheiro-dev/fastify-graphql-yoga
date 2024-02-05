require('dotenv').config()
module.exports = {
  client: 'mysql2',
  connection: {

    host: process.env.db_host,
    port: process.env.db_port,
    database: process.env.db_database,
    user: process.env.db_user,
    password: process.env.db_password,
    typeCast: function (field, next) {
      if (field.type === 'TINY' && field.length === 1) {
        return (field.string() === '1') // 1 = true, 0 = false
      }
      return next()
    },
    timezone: '-03:00'
  },
  debug: ['ComQueryPacket'],
  dateStrings: true,
  supportBigNumbers: true,
  seeds: {
    directory: './database/seeds'
  },
  migrations: {
    directory: './database/migrations'
  }
}
