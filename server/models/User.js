module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pic: {
      type: DataTypes.STRING,
      defaultValue:
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    },
  })

  User.associate = (models) => {
    User.hasMany(models.Message, {
      as: 'sender',
      foreignKey: {
        name: 'senderId',
        allowNull: false,
      },
    })
    User.hasMany(models.Conversation, {
      foreignKey: {
        name: 'senderId',
        allowNull: false,
      },
    })
    User.hasMany(models.Conversation, {
      foreignKey: {
        name: 'receiverId',
        allowNull: false,
      },
    })
  }

  return User
}
