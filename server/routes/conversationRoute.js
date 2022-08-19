const router = require('express').Router()
const { Conversation } = require('../models')
const { Op } = require('sequelize')

router.post('/', async (req, res, next) => {
  try {
    const { senderId, receiverId } = req.body
    const createdConversation = await Conversation.create({
      senderId,
      receiverId,
    })
    res.status(201).json(createdConversation)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params
    const conversation = await Conversation.findAll({
      where: { [Op.or]: [{ senderId: userId }, { receiverId: userId }] },
    })

    res.status(200).send(conversation)
  } catch (error) {
    next(error)
  }
})
module.exports = router
