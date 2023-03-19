const { User, AuthToken } = require('../models/index')
const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const validator = require('validator')

exports.getAllUsers = async (req, res) => {
  const data = await User.findAll({
    attributes: ['id', 'name', 'email', 'verified'],
    // limit: 10
  })
  res.json({
    message: 'get all users',
    data
  })
}

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body

    // cek apakah email valid
    if (!validator.isEmail(email)) return res.status(400).json({ message: 'Email tidak valid' })

    // cek apakah password dan confirmPassword sama
    if (password !== confirmPassword) return res.status(400).json({ message: 'Password dan confirm password tidak sama' })

    // cek apakah email sudah ada
    const data = await User.findOne({
      where: {
        email
      }
    })

    if (data) {
      return res.status(400).json({ message: 'Email sudah terdaftar' })
    }

    const id = 'usr-' + nanoid(12)
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    await User.create({ id, name, email, password: hashedPassword, verified: false })

    // menambahkan token verifikasi ke db 'AuthToken'
    const token = nanoid(20)
    await AuthToken.create({ token, userId: id })

    // kirim link ke email user
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_APP_PASSWORD
      }
    })
    const link = `${process.env.HOST}/api/users/verify?id=${id}&token=${token}`
    await transporter.sendMail({
      from: 'no-reply@koding-akademi',
      to: email,
      subject: "Please confirm your Email account",
      html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
    })

    res.status(201).json({
      message: 'Register berhasil',
      data: id
    })

  } catch (error) {
    res.status(400).json({
      error
    })
  }
}

exports.getUserById = async (req, res) => {
  try {
    const data = await User.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'name', 'email', 'verified']
    })
    res.json({
      message: 'get user by id',
      data
    })
  } catch (err) {
    res.status(404).json({ error: err })
  }
}

exports.updateUser = async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  try {
    await User.update({ name }, {
      where: {
        id
      }
    })

    res.json({
      message: 'update user success',
      data: id
    })
  } catch (err) {
    res.json({ error: err })
  }
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    await User.destroy({
      where: {
        id
      }
    })
    res.json({
      message: 'delete user success',
      data: id
    })
  } catch (err) {
    res.status(404).json({ error: err })
  }
}

exports.verifyUserEmail = async (req, res) => {
  const { id, token } = req.query
  const dataToken = await AuthToken.findOne({
    where: {
      token
    }
  })

  if (!dataToken) {
    return res.status(404).json({
      message: 'Not found'
    })
  }

  const dbToken = dataToken.dataValues.token
  if (dbToken !== token) {
    return res.status(400).json({
      message: 'Invalid token'
    })
  }

  await User.update({ verified: true }, {
    where: {
      id
    }
  })

  await AuthToken.destroy({
    where: {
      userId: id
    }
  })

  const verifiedPage = `
  <div style='height: 95vh; display: flex; align-items:center; justify-content: center;'>
    <p style='color: green; text-align: center; font-size: 1rem;'>Email berhasil diverifikasi...</p>
  </div>
  `
  res.send(verifiedPage)
}
