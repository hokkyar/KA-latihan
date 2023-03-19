const express = require('express')
const router = express.Router()

router.use(require('./authentication'))
router.use(require('./user'))
router.use(require('./course'))
router.use(require('./event'))
router.use(require('./article'))
router.use(require('./payment'))

module.exports = router
