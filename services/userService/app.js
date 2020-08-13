const express = require('express')
const {createMongoConnection} = require('./config/createMongoConnection')
const userRouter = require('./routes/userRoute')
const app = express()
const PORT = 3001

// app.use(createMongoConnection)

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/users', userRouter)

createMongoConnection().then(() => {
  app.listen(PORT, () => {
    console.log('Express jalan di port', PORT)
  })
})
