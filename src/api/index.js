const express = require('express')
const router = express.Router()

router.use(require('./users/routes'))
// router.use(require('./products/routes'))
router.use(require('./authentications/routes'))
router.use(require('./articles/routes'))
router.use(require('./payments/routes'))

module.exports = router