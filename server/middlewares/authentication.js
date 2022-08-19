const jwt = require('jsonwebtoken')

const { User } = require('../models')

module.exports = async (req, res, next) => {
  try {
    const { Authorization } = req.headers
    if (!Authorization || !Authorization.startsWith('Bearer')) {
      res.status(401).json('you are unauthorized')
    }

    const token = Authorization.split(' ')[1]

    const decoded = jwt.verify(token, 'secret_key')

    const user = await User.findOne({ where: { id: decoded.id } })

    if (!user) res.status(400).json('user is not found')

    req.user = user

    next()
  } catch (error) {
    next(error)
  }
}
