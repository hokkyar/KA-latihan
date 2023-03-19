const express = require('express')
const router = express.Router()

const Xendit = require('xendit-node')
const x = new Xendit({
  secretKey: process.env.XENDIT_TOKEN_SECRET,
})

const { Invoice } = x
const i = new Invoice({})

router.post('/payments', async (req, res) => {
  const { amount, payerEmail, description } = req.body
  try {
    const { invoice_url } = await i.createInvoice({
      externalID: 'INV-' + Date.now(),
      amount,
      payerEmail,
      description,
      shouldSendEmail: true,
    })

    res.status(200).json({ invoice_url })

  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

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