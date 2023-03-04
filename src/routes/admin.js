const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/admin')


router.get('/', AdminController.dashboard)
router.get('/user-handler', AdminController.userHandlerPage)
router.get('/course-handler', AdminController.courseHandlerPage)
router.get('/event-handler', AdminController.eventHandlerPage)
router.get('/qr-code', AdminController.qrHandlerPage)
router.get('/profile', AdminController.profile)
router.get('/faq', AdminController.faq)
router.get('/contact', AdminController.contact)

module.exports = router
