const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const authUserToken = require('../middleware/authUserToken')

const CourseController = require('../controllers/course')

router.get('/courses', authUserToken, CourseController.getAllCourses)
router.get('/courses/:id', CourseController.getCourseById)
router.post('/courses', upload.single('img'), CourseController.createCourse)
router.put('/courses/:id', CourseController.updateCourse)
router.delete('/courses/:id', CourseController.deleteCourse)

module.exports = router