/*
  fields: id, judul, deskripsi, tipe, harga, durasi
  keterangan:
    tipe (coding, robotics, app programming, engineering, bootcamp)
    durasi (30 hari)
*/

const { course } = require('../models/index')

exports.getAllCourses = async (req, res) => {
  const data = await course.findAll()
  res.json({
    message: 'get all courses',
    data
  })
}

exports.getCourseById = (req, res) => {
  res.json({
    message: 'get course by id'
  })
}

exports.createCourse = (req, res) => {
  res.json({
    message: 'create course'
  })
}

exports.updateCourse = (req, res) => {
  res.json({
    message: 'update course'
  })
}

exports.deleteCourse = (req, res) => {
  res.json({
    message: 'delete course'
  })
}
