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
 
  const [rows] = await pool.query(` 
  SELECT
    m.eidr,
    m.title,
    m.datePublished,
    m.genre,
    d.name AS directorName
  FROM G9.movies AS m
  JOIN G9.director AS d
  ON m.directorID = d.directorID
  ORDER BY m.title ASC;
`)
  return rows
}

export async function orderBy(order) {
  if (order == "ASC"){
    const [rows] = await pool.query(`SELECT * FROM G9.movies ORDER by title ASC`)
  } else if (order == "DESC") {
    const [rows] = await pool.query(`SELECT * G9.FROM movies ORDER by title DESC`)
  }
  return rows
}

export async function getGenre(genre) {
  if (order_by === "ASC"){
    const [rows] = await pool.query(`SELECT * FROM G9.movies WHERE genre = ? ORDER by title ASC`, [genre])}
  else if (order_by === "DESC"){
    const [rows] = await pool.query(`SELECT * FROM G9.movies WHERE genre = ? ORDER by title DESC`, [genre])
  }
  else {const [rows] = await pool.query(`SELECT * FROM G9.movies WHERE GENRE = ?`, [genre])}
  
    return rows[0]

}

export async function getByDirector(director){
  if (order_by === "ASC"){
    const [rows] = await pool.query(`SELECT * FROM movies WHERE director = ? ORDER by title ASC`, [director])}
  else if (order_by === "DESC"){
    const [rows] = await pool.query(`SELECT * FROM movies WHERE director = ? ORDER by title DESC`, [director])}
  else {
    const [rows] = await pool.query("SELECT * FROM movies WHERE director = ?", [director])
  }
  return rows[0]
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