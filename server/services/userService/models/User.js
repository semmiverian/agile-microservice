const {getDatabase, db} = require('./../config/createMongoConnection')
const {ObjectId} = require('mongodb')

class User {
  static database() {
    return getDatabase().collection('users')
  }

  static find() {
    return this.database().find().toArray()
  }

  static create(data) {
    return this.database().insertOne(data)
  }

  static findById(id) {
    return this.database().findOne({_id: ObjectId(id)})
  }
}

module.exports = User
