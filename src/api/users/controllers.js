const validator = require('validator')
const ClientError = require('../../exceptions/ClientError')
const InvariantError = require('../../exceptions/InvariantError')
const {
  getAllUsersService,
  registerUserService,
  sendEmailVerificationService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  verifyUserEmailService
} = require('./services')

exports.getAllUsers = async (req, res) => {
  const data = await getAllUsersService()
  return res.json({
    message: 'get all users',
    data
  })
}

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body

    if (!validator.isEmail(email)) throw new InvariantError('Email tidak valid')
    if (password !== confirmPassword) throw new InvariantError('Password dan confirm password tidak sama')

    const id = await registerUserService(name, email, password)
    await sendEmailVerificationService(id, email)

    return res.status(201).json({
      message: 'Register berhasil',
      data: id
    })
  } catch (error) {
    if (error instanceof ClientError) {
      return res.status(error.statusCode).json({ message: error.message })
    } else {
      return res.status(500).json({
        message: error
      })
    }
  }
}

exports.getUserById = async (req, res) => {
  try {
    const data = await getUserByIdService(req.params.id)
    return res.json({
      data
    })
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message
    })
  }
}

exports.updateUser = async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  try {
    await updateUserService(id, name)

    return res.json({
      message: 'User berhasil di update',
      data: id
    })

  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message })
  }
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    await deleteUserService(id)
    return res.json({
      message: 'User berhasil di hapus',
      data: id
    })
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message })
  }
}

exports.verifyUserEmail = async (req, res) => {
  try {
    if (!req.query.id) throw new InvariantError('Invalid ID')
    if (!req.query.token) throw new InvariantError('Invalid Token')
    const { id, token } = req.query
    await verifyUserEmailService(id, token)
    return res.json({
      message: 'Email berhasil diverifikasi'
    })
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message })
  }
}
