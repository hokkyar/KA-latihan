const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/admin')
const { checkLogin } = require('../middleware/checkLogin')

router.get('/login', AdminController.loginPages)
router.post('/login', AdminController.loginHandler)
router.get('/logout', AdminController.logoutHandler)

router.get('/dashboard', checkLogin, AdminController.dashboard)
router.get('/user-handler', checkLogin, AdminController.userHandlerPage)
router.get('/course-handler', checkLogin, AdminController.courseHandlerPage)
router.get('/event-handler', checkLogin, AdminController.eventHandlerPage)
router.get('/qr-code', checkLogin, AdminController.qrHandlerPage)
router.get('/profile', checkLogin, AdminController.profile)
router.get('/faq', checkLogin, AdminController.faq)
router.get('/contact', checkLogin, AdminController.contact)

module.exports = router
