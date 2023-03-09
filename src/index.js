require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')

const apiRoutes = require('./routes/index')
const adminRoutes = require('./routes/admin')

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'rahasia',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000 // 1 jam
  }
}))

app.use('/api', apiRoutes)
app.use('/admin', adminRoutes)

app.use((req, res, next) => res.status(404).render('pages/not-found'))
app.use((err, req, res, next) => res.status(500).send({ message: 'Internal Server Error', error: err }))

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server Running at PORT ${PORT}`))
