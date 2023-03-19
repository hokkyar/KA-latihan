const { Product } = require('../models/index')
const { nanoid } = require('nanoid')

exports.getAllEvents = async (req, res) => {
  const data = await Product.findAll({
    where: {
      catId: 2
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
    message: 'get all events',
    data
  })
}

exports.getEventById = async (req, res) => {
  const data = await Product.findAll({
    where: {
      catId: 2
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
    message: 'get event by id',
    data
  })
}

exports.createEvent = async (req, res) => {
  const { name, price, desc, date, quota } = req.body
  if (!req.file) {
    console.log('Gambar belum diupload')
  }
  const img = req.file.path
  const id = 'eve-' + nanoid(16)
  await Product.create({ id, name, price, img, desc, date, quota, catId: 2 })

  res.status(201).json({
    message: 'create event success',
    id
  })
}

exports.updateEvent = async (req, res) => {
  const { id } = req.params
  const { name, price, desc, date, quota } = req.body
  await Product.update({ name, price, desc, date, quota }, {
    where: {
      id
    }
  })
  res.json({
    message: 'update event success',
    id
  })
}

exports.deleteEvent = async (req, res) => {
  const { id } = req.params
  await Product.destroy({
    where: {
      id
    }
  })
  res.json({
    message: 'delete event success',
    id
  })
}
