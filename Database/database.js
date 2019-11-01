const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reviews',
  password: 'password',
  port: 5432,
})

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })

  // Select all reviews from the reviews table
const getAll = function() {
     return pool.query('SELECT * from reviews WHERE id = 5')
     .then((results) => {
         console.log('DATABASE QUERY: ', results.rows[0])
         return results.rows[0]
     })
    
}
module.exports = getAll;
