const express = require('express')
const router = express.Router()

const ProductController = require('./controller')
// const authUserToken = require('../../middleware/authUserToken')
const uploadImage = require('../../middleware/uploadImage')

router.get('/events', ProductController.getAllEvents)
router.get('/events/:id', ProductController.getEventById)
router.post('/events', ProductController.createEvent)
router.put('/events/:id', ProductController.updateEvent)
router.delete('/events/:id', ProductController.deleteEvent)

router.get('/courses', ProductController.getAllCourses)
router.get('/courses/:id', ProductController.getCourseById)
router.post('/courses', uploadImage.single('img'), ProductController.createCourse)
router.put('/courses/:id', ProductController.updateCourse)
router.delete('/courses/:id', ProductController.deleteCourse)

module.exports = router
