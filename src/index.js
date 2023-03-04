require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const apiRoutes = require('./routes/index')
const adminRoutes = require('./routes/admin')

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', apiRoutes)
app.use('/admin', adminRoutes)

app.use((req, res, next) => res.status(404).send({ message: 'Route Not Found' }))
app.use((err, req, res, next) => res.status(500).send({ message: 'Internal Server Error', error: err }))

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server Running at PORT ${PORT}`))
