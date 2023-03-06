const { user, emailToken } = require('../models/index')
const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const validator = require('validator')

exports.getAllUsers = async (req, res) => {
  const data = await user.findAll({
    attributes: ['id', 'name', 'email', 'verified'],
    limit: 10
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
    if (!validator.isEmail(email)) return res.status(400).json({ message: 'email tidak valid' })

    // cek apakah password dan confirmPassword sama
    if (password !== confirmPassword) return res.status(400).json({ message: 'password dan confirm password tidak sama' })

    // cek apakah email sudah ada
    const data = await user.findOne({
      where: {
        email
      }
    })

    if (data) {
      return res.status(400).json({ message: 'email sudah terdaftar' })
    }

    // menambahkan user baru ke db 'user'
    const id = nanoid(12)
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    await user.create({ id, name, email, password: hashedPassword })

    // menambahkan token verifikasi ke db 'emailToken'
    const token = nanoid(20)
    await emailToken.create({ id_user: id, token })

    // kirim link ke email user
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_APP_PASSWORD
      }
    })

    const link = `${process.env.HOST}/api/users/verify?id=${id}&token=${token}`
    const info = await transporter.sendMail({
      from: 'no-reply@koding-akademi',
      to: email,
      subject: "Please confirm your Email account",
      html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
    })

    res.status(201).json({
      message: 'Register berhasil', // silahkan cek email anda untuk verifikasi
      data: id,
      info
    })

  } catch (error) {
    res.status(400).json({
      error
    })
  }
}

exports.getUserById = async (req, res) => {
  const data = await user.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'name', 'email', 'verified']
  })

  res.json({
    message: 'get user by id',
    data
  })
}

exports.updateUser = async (req, res) => {
  const { id } = req.params
  const { name, email } = req.body

  await user.update({ name, email }, {
    where: {
      id
    }
  })

  res.json({
    message: 'update user success',
    data: id
  })
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params
  await user.destroy({
    where: {
      id
    }
  })
  res.json({
    message: 'delete user success',
    data: id
  })
}

exports.verifyUserLogin = async (req, res) => {
  const { email, password } = req.body

  // cek user input (pastikan inputnya string)
  if (typeof (email) !== 'string') {
    return res.status(400).json({
      message: 'input yang dimasukkan bukan string'
    })
  }

  // cek user ada atau tidak
  const data = await user.findOne({
    where: { email }
  })

  if (!data) {
    return res.status(404).json({
      message: 'user tidak ditemukan'
    })
  }

  // cek password
  const dbPassword = data.dataValues.password
  const match = await bcrypt.compare(password, dbPassword)

  if (!match) {
    return res.status(400).json({
      message: 'password salah'
    })
  }

  // cek apakah akun user sudah terverifikasi
  const verified = data.dataValues.verified
  if (!verified) {
    return res.status(401).json({
      message: 'akun belum diverifikasi'
    })
  }

  res.json({
    message: 'login success',
    data: data.dataValues.id
  })
}

exports.verifyUserEmail = async (req, res) => {
  // localhost:3000/api/users/verify?id=123&token=123
  const { id, token } = req.query

  // cek token di db emailToken
  const dataToken = await emailToken.findOne({
    where: {
      id_user: id
    }
  })

  if (!dataToken) {
    return res.status(404).json({
      message: 'not found'
    })
  }

  const dbToken = dataToken.dataValues.token
  if (dbToken !== token) {
    return res.status(400).json({
      message: 'invalid token'
    })
  }

  await user.update({ verified: true }, {
    where: {
      id
    }
  })

  await emailToken.destroy({
    where: {
      id_user: id
    }
  })

  const verifiedPage = `
  <div style='height: 95vh; display: flex; align-items:center; justify-content: center;'>
    <p style='color: green; text-align: center; font-size: 1.2rem;'>Email berhasil diverifikasi...</p>
  </div>
  `
  res.send(verifiedPage)

}
