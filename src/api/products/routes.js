const express = require('express')
const router = express.Router()

const EventController = require('../controllers/event')

router.get('/events', EventController.getAllEvents)
router.get('/events/:id', EventController.getEventById)
router.post('/events', EventController.createEvent)
router.put('/events/:id', EventController.updateEvent)
router.delete('/events/:id', EventController.deleteEvent)

router.get('/courses', authUserToken, CourseController.getAllCourses)
router.get('/courses/:id', CourseController.getCourseById)
router.post('/courses', upload.single('img'), CourseController.createCourse)
router.put('/courses/:id', CourseController.updateCourse)
router.delete('/courses/:id', CourseController.deleteCourse)

module.exports = router