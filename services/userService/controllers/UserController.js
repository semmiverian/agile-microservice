const User = require('./../models/User')

class UserController {
  static async find(req, res) {
    const users = await User.find()
    res.status(200).json(users)
  }

  static async create(req, res) {
    const result = await User.create(req.body)

    res.status(201).json(result.ops[0])
  }
}

module.exports = UserController
