//npm init
//npm install express mongoose dotenv cors
//npm install nodemon --save-dev
// "start": "nodemon server.js" -package.json

//Declare variables
const express = require('express')
const app = express()
const PORT = 8000
const mongoose = require('mongoose')
const connectDB = require('./config/db')
require('dotenv').config({ path: './config/.env' })
const homeRoutes = require('./routes/home')
const editRoutes = require('./routes/edit')
//const ToDoTask = require('./models/todotask')

//Connect to Mongo
connectDB()


//Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


//Set Routes
app.use('/', homeRoutes)
app.use('/edit', editRoutes)


//Start Server
app.listen(process.env.PORT || PORT, () => console.log(`Server is running on port ${PORT}`))


