const express = require('express')
const router = express.Router()

const EventController = require('../controllers/event')
// const authUserToken = require('../../middleware/authUserToken')
const uploadImage = require('../../middleware/uploadImage')

router.get('/events', EventController.getAllEvents)
router.get('/events/:id', EventController.getEventById)
router.post('/events', EventController.createEvent)
router.put('/events/:id', EventController.updateEvent)
router.delete('/events/:id', EventController.deleteEvent)

router.get('/courses', CourseController.getAllCourses)
router.get('/courses/:id', CourseController.getCourseById)
router.post('/courses', uploadImage.single('img'), CourseController.createCourse)
router.put('/courses/:id', CourseController.updateCourse)
router.delete('/courses/:id', CourseController.deleteCourse)

module.exports = router
