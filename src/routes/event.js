const express = require('express')
const router = express.Router()

const EventController = require('../controllers/event')

router.get('/events', EventController.getAllEvents)
router.get('/events/:id', EventController.getEventById)
router.post('/events', EventController.createEvent)
router.put('/events/:id', EventController.updateEvent)
router.delete('/events/:id', EventController.deleteEvent)

module.exports = router