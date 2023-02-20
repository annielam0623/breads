// CONFIGURATION

const express = require('express')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI

// DEPENDENCIES
const methodOverride = require('method-override')

// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//MONGOOSE
mongoose.set('strictQuery', true);
mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('connected to mongo: ', process.env.MONGO_URI)
  }
)


// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to an Awesome App about Breads!')
})

// Breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// 404 Page
app.get('*', (req, res) => {
  res.send('404')
})


// LISTEN
app.listen(PORT, () => {
  console.log('listening on port', PORT);
})




// npm install react@^16.0.0 react-dom@^16.0.0