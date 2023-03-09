const { course } = require('../models/index')
const { nanoid } = require('nanoid')

exports.getAllCourses = async (req, res) => {
  const data = await course.findAll({
    attributes: ['id', 'title', 'price', 'description', 'image', 'category']
  })
  res.json({
    message: 'get all courses',
    data
  })
}

exports.getCourseById = async (req, res) => {
  const data = await course.findOne({
    where: {
      id: req.params.id
    }
  })
  res.json({
    message: 'get course by id',
    data
  })
}

exports.createCourse = async (req, res) => {
  const { title, price, image, description, category, requirement, age, meetings, period, duration, classConsist } = req.body
  const id = nanoid(16)
  await course.create({
    id, title, price, image, description, category, requirement: '-', age: '-', meetings: '-', period: '-', duration: '-', classConsist: '-'
  })
  res.status(201).json({
    message: 'create course success',
    id
  })
}

exports.updateCourse = async (req, res) => {
  const { id } = req.params
  const { title, price, image, description, category, requirement, age, meetings, period, duration, classConsist } = req.body
  await course.update({
    title, price, image, description, category, requirement, age, meetings, period, duration, classConsist
  }, {
    where: {
      id
    }
  })
  res.json({
    message: 'update course success',
    id
  })
}

exports.deleteCourse = async (req, res) => {
  const { id } = req.params
  await course.destroy({
    where: {
      id
    }
  })
  res.json({
    message: 'delete course success',
    id
  })
}
