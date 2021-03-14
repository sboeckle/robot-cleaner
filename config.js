module.exports = {
  server: {
    port: process.env.port || ' 5000'
  },
  db: {
    username: process.env.POSTGRES_USER || 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DATABASE || 'example',
    password: process.env.POSTGRES_PASSWORD || 'password',
    dialect: 'postgres',
    port: process.env.POSTGRES_PORT || 5432,
    executionsTable: 'executions',
  },
}