const router = require('express').Router()
const UserController = require('./../controllers/UserController')

router.get('/', UserController.find)
router.post('/', UserController.create)
router.get('/:id', UserController.findById)

module.exports = router
