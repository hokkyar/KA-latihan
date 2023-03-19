const { User, AuthToken } = require('../../models/index')
const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')

const getAllUsersService = async () => {
  const data = await User.findAll({
    attributes: ['id', 'name', 'email', 'verified'],
    // limit: 10
  })
  return data
}

const registerUserService = async (name, email, password) => {
  const data = await User.findOne({
    where: {
      email
    }
  })

  if (data) {
    throw new InvariantError('Email sudah terdaftar')
  }

  const id = 'usr-' + nanoid(12)
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)
  await User.create({ id, name, email, password: hashedPassword, verified: false })

  return id
}

const sendEmailVerificationService = async (id, email) => {
  const token = nanoid(20)
  await AuthToken.create({ token, userId: id })

  const transporter = nodemailer.createTransport({
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
}

const getUserByIdService = async (id) => {
  const data = await User.findOne({
    where: { id },
    attributes: ['id', 'name', 'email', 'verified']
  })
  if (!data) throw new NotFoundError('User tidak ditemukan')

  return data
}

const updateUserService = async (id, name) => {
  const data = await User.findOne({
    where: { id }
  })
  if (!data) throw new NotFoundError('User tidak ditemukan')

  await User.update({ name }, {
    where: { id }
  })
}

const deleteUserService = async (id) => {
  const data = await User.findOne({
    where: { id }
  })
  if (!data) throw new NotFoundError('User tidak ditemukan')

  await User.destroy({
    where: { id }
  })
}

const verifyUserEmailService = async (id, token) => {
  const dataToken = await AuthToken.findOne({
    where: { token }
  })

  if (!dataToken) {
    throw new NotFoundError('Token not found')
  }

  const dbToken = dataToken.dataValues.token
  if (dbToken !== token) {
    throw new InvariantError('Invalid token')
  }

  await User.update({ verified: true }, {
    where: { id }
  })

  await AuthToken.destroy({
    where: {
      userId: id
    }
  })
}

module.exports = {
  getAllUsersService,
  registerUserService,
  sendEmailVerificationService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  verifyUserEmailService
}