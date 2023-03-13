const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/authentication')

router.post('/authentication', AuthController.loginUser)
router.put('/authentication', AuthController.updateToken)
router.delete('/authentication', AuthController.logOutUser)

module.exports = router