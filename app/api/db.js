const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.dbhost,
  user: process.env.dbuser,
  password: process.env.dbpassword,
  database: process.env.dbname,
});

module.exports = pool;
