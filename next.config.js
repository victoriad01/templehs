/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals = config.externals.concat([
      // Possible drivers (and related modules) for knex - we'll ignore them
      'tedious',
      'better-sqlite3',
      'sqlite3',
      'mariasql',
      'mssql',
      'mysql',
      'mysql2',
      'oracle',
      'strong-oracle',
      'oracledb',
      'pg-query-stream',

      // etc. with more modules
    ])
    return config
  },
}

module.exports = nextConfig
