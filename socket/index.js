const io = require('socket.io')(8900, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

let users = []

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId })
}

const getUser = (userId) => {
  return users.find((user) => user.userId === userId)
}

const removeUser = (socketId) => {
  return users.filter((user) => user.socketId !== socketId)
}

//on connected
io.on('connection', (socket) => {
  console.log('a user connected.')
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id)
    io.emit('getUsers', users)
  })

  //sending a message
  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId)
    io.to(user.senderId).emit('getMessage', {
      senderId,
      text,
    })
  })

  //on disconnected
  socket.on('disconnect', () => {
    console.log('a user disconnected')
    removeUser(socket.id)
  })
})
