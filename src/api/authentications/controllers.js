const jwt = require('jsonwebtoken')
const validator = require('validator')
const InvariantError = require('../../exceptions/InvariantError')

const {
  loginUserService,
  addRefreshTokenService,
  updateTokenService,
  logOutUserService
} = require('./services')

exports.loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    if (!validator.isEmail(email)) throw new InvariantError('Email tidak valid')
    const id = await loginUserService(email, password)

    const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
    const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
    await addRefreshTokenService(refreshToken, id)

    return res.json({
      message: 'login success',
      accessToken,
      refreshToken
    })

  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message })
  }
}

exports.updateToken = async (req, res) => {
  const { refreshToken } = req.body
  try {
    await updateTokenService(refreshToken)
    const { id } = jwt.decode(refreshToken)
    const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })

    return res.json({
      message: 'Access token diperbarui!',
      accessToken
    })
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message })
  }
}

exports.logOutUser = async (req, res) => {
  const { refreshToken } = req.body
  try {
    await logOutUserService(refreshToken)
    return res.status(204)
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message })
  }
}