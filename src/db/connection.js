import { createPool } from 'mysql2/promise'

let pool

function connect () {
  if (typeof pool !== 'undefined') {
    return pool
  }

  pool = createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    queueLimit: 10,
    idleTimeout: 60
  })

  return pool
}

export async function getConnection () {
  return await connect().getConnection()
}
