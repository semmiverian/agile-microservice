const express = require('express')
const axios = require('axios')
const Redis = require('ioredis')
const app = express()
const PORT = 3000
const redis = new Redis()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/users', async (req, res) => {
  // Mengecheck apakah data users ada di cache atau tidak
  const userCache = await redis.get('users')
  console.log(userCache)
  // Kalau ada maka tampilkan data yang disimpan dari cache nya
  if (userCache) {
    console.log('kondisi terpenuh')
    res.status(200).json(JSON.parse(userCache))
  } else {
    // Kalau tidak ada maka ambil data dari service nya

    // Mengambil data dari user yang disimpan pada userService
    const response = await axios.get('http://localhost:3001/users')

    // Simpanlah data yang diterima dari userService ke dalam cache di redisnya
    await redis.set('users', JSON.stringify(response.data))

    res.status(200).json(response.data)
  }
})

app.post('/users', async (req, res) => {
  const response = await axios.post('http://localhost:3001/users', req.body)
  await redis.del('users')

  res.status(201).json(response.data)
})

app.listen(PORT, () => {
  console.log('Orchestrator dijalankan di port', PORT)
})
