const router = require('express').Router()

const { Op } = require('sequelize')
const { User } = require('../models')

router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params
  try {
    const user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ['password'] },
    })
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

module.exports = router
