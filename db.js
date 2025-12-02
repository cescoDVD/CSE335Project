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
export async function getMovies(order_by) {
  if (order_by == "ASC"){
    const [rows] = await pool.query("SELECT * FROM G9.movies ORDER by title ASC")}
  else if (order_by == "DESC"){
    const [rows] = await pool.query("SELECT * FROM G9.movies ORDER by title DESC")
  }
  else {
    const [rows] = await pool.query("SELECT * FROM G9.movies")
  }
//const rows = result[0]
  return rows
}

export async function getGenre(genre, order_by) {

  const [rows] = await pool.query("SELECT * FROM G9.movies WHERE genre = ?", [genre])
  return rows

}

export async function getByDirector(director, order_by){
  if (order_by == "ASC"){
    const [rows] = await pool.query("SELECT * FROM G9.movies WHERE director = ? ORDER BY title ASC", [director])}
  else if (order_by == "DESC"){
    const [rows] = await pool.query("SELECT * FROM G9.movies WHERE director = ? ORDER BY title DESC", [director])}
  else {
    const [rows] = await pool.query("SELECT * FROM G9.movies WHERE director = ?", [director])
  }
  return [rows]
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