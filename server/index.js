const express = require('express')
const db = require('./models')
const cors = require('cors')
const authRoute = require('./routes/authRoute')
const messageRoute = require('./routes/messageRoute')
const userRoute = require('./routes/userRoute')
const conversationRoute = require('./routes/conversationRoute')
const { sequelize } = require('./models')

const app = express()
app.use(cors())

app.use(express.json())

app.use('/auth', authRoute)
app.use('/message', messageRoute)
app.use('/user', userRoute)
app.use('/conversation', conversationRoute)

// app.get('/err', (req, res, next) => {
//   setTimeout(() => {
//     try {
//       console.log('Async code example.')
//       throw new Error('Hello Error!')
//     } catch (error) {
//       next(error)
//     }
//   }, 1000)
// })
// app.use((req, res) => {
//   res.status(404).json('not found on this server')
// })

// app.use((err, req, res, next) => {
//   console.log(err)
//   res.status(500).json('server error')
// })

app.listen(8000, () => {
  console.log('server running on port 8000')
})
