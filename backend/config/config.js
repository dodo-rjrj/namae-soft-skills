require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'anass2012',
    database: process.env.DB_NAME || 'softskills_db',
    host: process.env.DB_HOST || 'postgres',
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'anass2012',
    database: process.env.TEST_DB_NAME || 'softskills_test',
    host: process.env.DB_HOST || 'postgres',
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: process.env.PROD_DB_USER || 'root',
    password: process.env.PROD_DB_PASSWORD || null,
    database: process.env.PROD_DB_NAME || 'database_production',
    host: process.env.PROD_DB_HOST || '127.0.0.1',
    dialect: 'mysql',
  }
};
