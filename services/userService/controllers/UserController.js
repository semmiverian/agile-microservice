const User = require('./../models/User')

class UserController {
  static async find(req, res) {
    const users = await User.find()
    res.status(200).json(users)
  }

  static async create(req, res) {
    await User.create(req.body)

    res.status(201).json({status: 'ok', message: 'Succesfully inserting new document'})
  }
}

module.exports = UserController
