const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/nickname',authMiddleware, userController.changeNickname)
router.post('/password',authMiddleware, userController.changePassword)
router.get('/auth', authMiddleware, userController.check)

module.exports = router
