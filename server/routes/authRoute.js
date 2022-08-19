const router = require('express').Router()
const bcrypt = require('bcryptjs')
const { User } = require('../models')
const { sign } = require('jsonwebtoken')

router.post('/register', async (req, res, next) => {
  const { name, password } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({ name, password: hashedPassword })
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { name, password } = req.body
    const user = await User.findOne({ where: { name } })
    if (!user) {
      res.json({ msg: 'Incorrect Username or Password', status: false })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      res.json({ msg: 'Incorrect Username or Password', status: false })
    }

    const token = sign(
      { name: user.name, id: user.id, pic: user.pic },
      'secret_key'
    )

    res.status(200).json({ status: true, token })
  } catch (err) {
    next(err)
  }
})

module.exports = router
