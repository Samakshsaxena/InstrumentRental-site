// lib/sql.ts
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',       // change if using remote DB
  user: 'your_sql_user',
  password: 'your_sql_password',
  database: 'your_database',
});

export default pool;
