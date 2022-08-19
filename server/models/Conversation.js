module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {})

  Conversation.associate = (models) => {
    Conversation.belongsTo(models.User, {
      as: 'sender',
      foreignKey: {
        name: 'senderId',
        allowNull: false,
      },
    })
    Conversation.belongsTo(models.User, {
      as: 'receiver',
      foreignKey: {
        name: 'receiverId',
        allowNull: false,
      },
    })
    Conversation.hasOne(models.Message, {
      foreignKey: {
        name: 'conversationId',
        allowNull: false,
      },
    })
  }

  return Conversation
}
