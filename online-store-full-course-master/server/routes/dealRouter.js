const Router = require('express')
const router = new Router()
const dealController = require('../controllers/dealController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create',authMiddleware, dealController.create)
router.get('/get',authMiddleware, dealController.getAll)
router.post('/getUserDeals', authMiddleware, dealController.getUserDeal)
router.post('/getOne', authMiddleware, dealController.getOneDeal)

module.exports = router
