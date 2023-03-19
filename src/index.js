require('dotenv').config()
const express = require('express')
const app = express()

app.set('views', './src/views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/assets', express.static('public/img/'))

const cors = require('cors')
app.use(cors())

app.use(express.json())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

const session = require('express-session')
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 }
}))

const api = require('./api/index')
const admin = require('./admin/routes')
app.use('/api', api)
app.use('/admin', admin)

app.use((req, res, next) => res.status(404).render('pages/not-found'))
app.use((err, req, res, next) => res.status(500).send({ message: 'Internal Server Error', error: err }))

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server Running at PORT ${PORT}`))
