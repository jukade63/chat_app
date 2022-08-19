const router = require('express').Router()
const { Message, User } = require('../models')
const { Op } = require('sequelize')

router.post('/', async (req, res) => {
  const { conversationId, senderId, text } = req.body
  const msg = await Message.create({ conversationId, senderId, text })

  res.status(201).json(msg)
})

router.get('/:conversationId', async (req, res) => {
  const { conversationId } = req.params
  const messages = await Message.findAll({
    where: { conversationId },
    // include: {
    //   model: User,
    //   as: 'receiver',
    //   attributes: {
    //     exclude: ['password'],
    //   },
    // },
  })
  res.status(200).json(messages)
})

module.exports = router
