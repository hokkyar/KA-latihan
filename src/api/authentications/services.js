const { User, AuthToken } = require('../../models/index')
const bcrypt = require('bcrypt')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')
const AuthenticationError = require('../../exceptions/AuthenticationError')

const loginUserService = async (email, password) => {
  const data = await User.findOne({
    where: { email }
  })
  if (!data) throw new NotFoundError('User tidak ditemukan')

  const dbPassword = data.dataValues.password
  const match = await bcrypt.compare(password, dbPassword)
  if (!match) throw new InvariantError('Password salah')

  const { verified } = data.dataValues
  if (!verified) throw new AuthenticationError('Akun belum diverifikasi', 401)

  return data.id
}

const addRefreshTokenService = async (refreshToken, id) => {
  await AuthToken.create({ token: refreshToken, userId: id })
}

const updateTokenService = async (refreshToken) => {
  const data = await AuthToken.findOne({
    where: {
      token: refreshToken
    }
  })
  if (!data) throw new InvariantError('Token tidak valid')
}

const logOutUserService = async (refreshToken) => {
  const data = await AuthToken.findOne({
    where: { token: refreshToken }
  })

  if (!data) throw new NotFoundError('Token tidak ditemukan')

  await AuthToken.destroy({
    where: { token: refreshToken }
  })
}

module.exports = {
  loginUserService,
  addRefreshTokenService,
  updateTokenService,
  logOutUserService
}