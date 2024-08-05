require('dotenv').config()

const express = require('express')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')

// express app 
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)


// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests 
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB. Listening on port', process.env.PORT)
        })

    })
    .catch((error) => {
        console.log(error)
    })

// dotenv is a package that loads enviroment variables from .env file into a process.env object 
// - avaialble to us in nodejs global environment

// mongoose - ODM (object data modelling) library - wraps mondo db with an extra layer to help us use 
// methos to write and read documents. it also gives us a way to declare models and schemas to ensure a more 
// strict data structure. Allows to add structure and make schemas which mongo db doesn't allow