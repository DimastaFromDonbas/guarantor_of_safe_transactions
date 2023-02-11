const Router = require('express')
const router = new Router()
const messageToAdmin = require('../controllers/messageToAdmin')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, messageToAdmin.create)
router.post('/createForAdmin', authMiddleware, messageToAdmin.createForAdmin)
router.post('/get', authMiddleware, messageToAdmin.getMessagesToAdmin)

module.exports = router
