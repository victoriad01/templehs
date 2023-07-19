// const knex = require('./knex.ts')

import knex from './knex'
import knexfile from './knexfile'

// const knexfile = require('./knexfile.ts')

export const db = knex(knexfile.development)

module.exports = db

// const Pool = require('pg').Pool

// require('dotenv').config()

// const pool = new Pool({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: 'localhost',
//   port: process.env.DB_PORT,
//   database: process.env.DATABASE,
// })

// module.exports = pool
