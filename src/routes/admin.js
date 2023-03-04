const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/admin')

// dashboard page
router.get('/', AdminController.dashboard)

// user handler page
router.get('/user-handler', AdminController.userHandlerPage)

// course handler page
router.get('/course-handler', AdminController.courseHandlerPage)

// event handler page
// router.get('/event-handler', AdminController.eventHandlerPage)

module.exports = router
