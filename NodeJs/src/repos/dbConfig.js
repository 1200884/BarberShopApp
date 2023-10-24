require('dotenv').config();

const { Pool } = require('pg');

const config = {
  postgres: {
    connectionString: process.env.DB_URL,
  },
};

module.exports = config;
