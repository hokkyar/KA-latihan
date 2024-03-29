const { Product, Category } = require('../models/index')
const { nanoid } = require('nanoid')

exports.getAllCourses = async (req, res) => {
  const data = await Product.findAll({
    attributes: ['id', 'name', 'quota', 'price'],
    where: {
      catId: 1
    },
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['name']
      }
    ]
  })
  res.json({
    message: 'get all courses',
    data
  })
}

exports.getCourseById = async (req, res) => {
  const data = await Product.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['name']
      }
    ]
  })
  res.json({
    message: 'get course by id',
    data
  })
}

exports.createCourse = async (req, res) => {
  const { name, price, desc, quota } = req.body
  if (!req.file) {
    console.log('Gambar belum diupload')
  }
  const img = req.file.path
  const id = 'crs-' + nanoid(16)
  await Product.create({ id, name, price, date: null, quota, img, desc, catId: 1 })
  res.status(201).json({
    message: 'create course success',
    id
  })
}

exports.updateCourse = async (req, res) => {
  const { id } = req.params
  const { name, price, desc, img, quota } = req.body
  await Product.update({
    name, price, desc, img, quota
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
  await Product.destroy({
    where: {
      id
    }
  })
  res.json({
    message: 'delete course success',
    id
  })
}
