const express = require('express')
const router = express.Router()

const PaymentController = require('./controller')

router.post('/payments', PaymentController.createPayment)

// menerima callback dari xendit
const dbTemp = []
router.post('/send-cb', (req, res) => {
  dbTemp.push(req.body)
  res.json({
    data: req.body
  })
})

router.get('/cb', (req, res) => {
  res.json({
    data: dbTemp
  })
})

module.exports = router