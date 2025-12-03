import express from 'express'

import  {getMovies, getMovie, getGenre, getByDirector, orderBy}  from './db.js'

const app =  express()

app.use(express.static('frontend'));

//get all entries
app.get("/movies/", async (req,res) => {
    const movies = await getMovies();
    res.json(movies);
})

app.get("movies/:order_by", async (req,res) => {
    const order_by = req.params.order_by
    const movies = await orderBy(order_by)
    res.json(movies)
})
//get 1 entry
app.get("/movies/:eidr", async (req,res) => {
    const eidr = req.params.eidr
    const movie = await getMovie(eidr)
    res.json(movie)
})

app.get("movies/:genre", async (req,res)=> {
    const genre = req.params.genre
    const order_by = req.params.order_by ? req.params.genre : ""
    const movies = await getGenre(genre, order_by)
    res.json(movies)
})

app.get("movies/:director", async (req, res) => {
    const director = req.params.director
    const order_by = req.params.order_by ? req.params.genre : "none"
    const movies = await getByDirector(director, order_by)
    res.json(movies)
})

//error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})



