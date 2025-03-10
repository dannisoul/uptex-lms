import { createPool } from 'mysql2/promise'

let pool

function connect () {
  if (typeof pool !== 'undefined') {
    return pool
  }

  pool = createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    // socketPath: process.env.DB_SOCKETPATH,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    connectionLimit: 10,
    queueLimit: 10,
    idleTimeout: 60,
    connectTimeout: 20000,
    waitForConnections: true
  })

  return pool
}

export async function getConnection () {
  return await connect().getConnection()
}
