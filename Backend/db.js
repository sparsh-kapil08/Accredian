const { Pool } =require('pg');
require('dotenv').config();

const connectionString = process.env.string;

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;