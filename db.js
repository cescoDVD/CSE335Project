import mysql from 'mysql2';
 
import dotenv from 'dotenv';
dotenv.config()

//connects to database: use a .env file to set up macroes
const pool = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise();

//function to get all movies
export async function getMovies() {
  const [rows] = await pool.query("SELECT * FROM G9.movies ORDER by title ASC")
//const rows = result[0]
  return rows
}
 
//function to get only one movie
export async function getMovie(eidr) {
  const [rows] = await pool.query(`
    SELECT * 
    FROM movies
    WHERE eidr = ?
    `, [eidr])
  return rows[0]
}