const express = require('express')
const router = express.Router()
const CourseController = require('../controllers/courses')
const UserController = require('../controllers/users')

const upload = require('../middleware/upload')

// courses
router.get('/courses', CourseController.getAllCourses)
router.get('/courses/:id', CourseController.getCourseById)
router.post('/courses', upload.single('image'), CourseController.createCourse)
router.put('/courses/:id', CourseController.updateCourse)
router.delete('/courses/:id', CourseController.deleteCourse)

// users
router.post('/users/register', UserController.registerUser)
router.post('/users/login', UserController.verifyUserLogin)
router.get('/users/verify', UserController.verifyUserEmail)

router.get('/users', UserController.getAllUsers)
router.get('/users/:id', UserController.getUserById)
router.put('/users/:id', UserController.updateUser)
router.delete('/users/:id', UserController.deleteUser)

module.exports = router
