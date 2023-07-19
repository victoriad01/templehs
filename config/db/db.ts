// const knex = require('knex')
// const config = require('../../knexfile')
// const db = knex(config.development)
// module.exports = db
// module.exports = knex(config.development)

import knex from 'knex'

// @ts-ignore
import config from '../../knexfile'

export const db = knex(config['development'])
