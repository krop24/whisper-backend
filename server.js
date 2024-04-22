const dotenv = require('dotenv').config()

const express = require('express');
const app = express()
const PORT = 6667

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
    retryWrites: true,
    w: 'majority',
    appName: 'ChatApp'
}).then (() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log(err)
})



app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})
