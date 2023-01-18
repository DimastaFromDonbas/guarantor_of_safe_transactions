const Router = require('express')
const router = new Router()
const dealController = require('../controllers/dealController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', dealController.create)
router.get('/get', dealController.getAll)
router.post('/getOne', dealController.getOne)

module.exports = router
