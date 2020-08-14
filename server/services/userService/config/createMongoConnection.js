const {MongoClient} = require('mongodb')
const uri = 'mongodb://localhost:27017'

// async function connectToMongo(req, res, next) {
//   if (req.database) {
//     next()
//   } else {
//     try {
//       const client = new MongoClient(uri, {useUnifiedTopology: true})

//       await client.connect()

//       // koneksi ke database berhasil dibuat
//       const database = client.db('agile-fox')
//       req.database = database
//       next()
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

// module.exports = connectToMongo

let database = null

async function createMongoConnection() {
  try {
    const client = new MongoClient(uri, {useUnifiedTopology: true})

    await client.connect()

    // koneksi ke database berhasil dibuat
    console.log('mongo connection created')
    database = client.db('agile-fox')
    return database
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createMongoConnection,
  getDatabase() {
    return database
  }
}
