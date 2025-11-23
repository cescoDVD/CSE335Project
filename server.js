import express from 'express'

import  {getMovies, getMovie}  from './db.js'

const app =  express()

//get all entries
app.get("/movies", async (req,res) => {
    const movies = await getMovies()
    res.send(movies)
})
//get 1 entry
app.get("/movies/:eidr", async (req,res) => {
    const eidr = req.params.eidr
    const movie = await getMovie(eidr)
    res.send(movie)
})

//error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.use(express.static('frontend'));

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})


