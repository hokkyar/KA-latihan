const { product } = require('../models/index')
// const { nanoid } = require('nanoid')

exports.getAllEvents = async (req, res) => {
  res.json({
    message: 'get all events',
  })
}

exports.getEventById = async (req, res) => {
  res.json({
    message: 'get event by id',
  })
}

exports.createEvent = async (req, res) => {
  res.status(201).json({
    message: 'create event success',
    id
  })
}

exports.updateEvent = async (req, res) => {
  res.json({
    message: 'update event success',
    id
  })
}

exports.deleteEvent = async (req, res) => {
  res.json({
    message: 'delete event success',
    id
  })
}
