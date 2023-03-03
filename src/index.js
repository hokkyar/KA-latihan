require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const routes = require('./routes/index')

app.use(cors())
app.use(express.json())
app.use('/api', routes)
app.use((req, res, next) => res.status(404).send({ message: 'Route Not Found' }))
app.use((err, req, res, next) => res.status(500).send({ message: 'Internal Server Error', error: err }))

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server Running at PORT ${PORT}`))
