const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
// const authUserToken = require('../middleware/authUserToken')

const CourseController = require('../controllers/course')
const EventController = require('../controllers/event')

router.get('/courses', CourseController.getAllCourses)
router.get('/courses/:id', CourseController.getCourseById)
router.post('/courses', upload.single('image'), CourseController.createCourse)
router.put('/courses/:id', CourseController.updateCourse)
router.delete('/courses/:id', CourseController.deleteCourse)

router.get('/events', EventController.getAllEvents)
router.get('/events/:id', EventController.getEventById)
router.post('/events', EventController.createEvent)
router.put('/events/:id', EventController.updateEvent)
router.delete('/events/:id', EventController.deleteEvent)

module.exports = router