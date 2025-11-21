import mysql from 'mysql2';
 
import dotenv from 'dotenv';
dotenv.config()

const pool = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise();

async function getMovies() {
  const [rows] = await pool.query("SELECT * FROM movies")
//const rows = result[0]
  return rows
}

const movies = await getMovies()
console.log(movies)