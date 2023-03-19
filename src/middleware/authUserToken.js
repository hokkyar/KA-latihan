const jwt = require('jsonwebtoken')

const authUserToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan' })
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = decodedToken
    next()
  } catch (err) {
    return res.status(403).json({ message: 'Token tidak valid' })
  }
}

module.exports = authUserToken