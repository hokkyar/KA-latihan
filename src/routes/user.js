const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')

router.post('/users', UserController.registerUser)
router.get('/users/verify', UserController.verifyUserEmail)
router.get('/users', UserController.getAllUsers)
router.get('/users/:id', UserController.getUserById)
router.put('/users/:id', UserController.updateUser)
router.delete('/users/:id', UserController.deleteUser)

module.exports = router