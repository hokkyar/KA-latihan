const express = require('express')
const router = express.Router()

router.use(require('./authentication'))
router.use(require('./product'))
router.use(require('./user'))

module.exports = router
