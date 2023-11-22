// src/db/db.js
const { Pool } = require("pg");

console.log(process.env.DB_CONNECTION_STRING);

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
