const Router = require('express')
const router = new Router()
const telegramController = require('../controllers/telegramController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/delete', authMiddleware, telegramController.delete)
router.post('/create', authMiddleware, telegramController.create)
router.get('/get', authMiddleware, telegramController.getAll)

module.exports = router
