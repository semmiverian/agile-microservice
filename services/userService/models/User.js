const {getDatabase, db} = require('./../config/createMongoConnection')

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
}

module.exports = User
