const { User, AuthToken } = require('../models/index')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.loginUser = async (req, res) => {
  const { email, password } = req.body

  // cek user input (pastikan inputnya string)
  if (typeof (email) !== 'string') {
    return res.status(400).json({
      message: 'Input yang dimasukkan tidak valid'
    })
  }

  // cek user ada atau tidak
  const data = await User.findOne({
    where: { email }
  })

  if (!data) {
    return res.status(404).json({
      message: 'User tidak ditemukan'
    })
  }

  // cek password
  const dbPassword = data.dataValues.password
  const match = await bcrypt.compare(password, dbPassword)

  if (!match) {
    return res.status(400).json({
      message: 'Invalid password'
    })
  }

  // cek apakah akun user sudah terverifikasi
  const { id, verified } = data.dataValues
  if (!verified) {
    return res.status(401).json({
      message: 'Akun belum diverifikasi'
    })
  }

  const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
  const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
  await AuthToken.create({ token: refreshToken, userId: id })

  res.json({
    message: 'login success',
    accessToken,
    refreshToken
  })
}

exports.updateToken = async (req, res) => {
  const { refreshToken } = req.body
  const data = await AuthToken.findOne({
    where: {
      token: refreshToken
    }
  })

  if (!data) {
    return res.json({
      message: 'Token tidak valid'
    })
  }

  const { id } = jwt.decode(refreshToken)
  const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })

  return res.json({
    message: 'Access Token diperbarui!',
    accessToken
  })
}

exports.logOutUser = async (req, res) => {
  const { refreshToken } = req.body

  try {
    await AuthToken.destroy({
      where: {
        token: refreshToken
      }
    })
  } catch (err) {
    return res.json({
      message: 'error',
      err
    })
  }

  return res.json({
    message: 'Berhasil Logout!',
  })
}