const Router = require('express')
const router = new Router()
const siteNameController = require('../controllers/siteNameController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, siteNameController.create)
router.post('/update', authMiddleware, siteNameController.update)
router.get('/get', siteNameController.getName)
router.get('/getAll', authMiddleware, siteNameController.getAllNames)

module.exports = router
