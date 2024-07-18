require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')

mongoose.connect(process.env.URI)
    .then(()=>{
        console.log("Connected successfully")
    })
    .catch((error)=>{
        console.log("Error :", error)
    })


const app = express()

app.use(express.json())
app.use(cors())
app.use('/users', userRoutes)

app.use((req, res, next)=>{
    next()
})

app.listen(process.env.PORT, ()=>{
    console.log('Listening to port number: ', process.env.PORT)
})