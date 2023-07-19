// require('ts-node/register')

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const config = {
  development: {
    client: 'postgresql',
    connection:
      'postgres://ferazvmw:kwG6wK7p2G2RjKYOn1xFN0H7tAkjPH6K@mahmud.db.elephantsql.com/ferazvmw',
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },

    production: {
      client: 'postgresql',
      connection: process.env.CONNECTION_STRING,
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: 'knex_migrations',
      },
    },
  },

  // staging: {
  //   client: 'pg',
  //   connection: {
  //     database: 'my_db',
  //     user: 'username',
  //     password: 'password',
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //   },
  // },
}

// export default config

module.exports = config
