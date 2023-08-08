const Pool = require("pg").Pool;

require("dotenv").config();
const { USER, PASSWORD, DB_HOST, DATABASE } = process.env;

const pool = new Pool({
  user: USER,
  password: PASSWORD,
  host: DB_HOST,
  port: 5432,
  database: DATABASE,
});

module.exports = pool;
