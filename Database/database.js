const key = require('../config/config.js').database;

const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reviews_api',
  password: key,
  port: 5432,
})

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })

module.exports = pool;
