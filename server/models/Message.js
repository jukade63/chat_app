module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      as: 'sender',
      foreignKey: {
        name: 'senderId',
        allowNull: false,
      },
    })
  }
  Message.associate = (models) => {
    Message.belongsTo(models.Conversation, {
      foreignKey: {
        name: 'conversationId',
        allowNull: false,
      },
    })
  }

  return Message
}
