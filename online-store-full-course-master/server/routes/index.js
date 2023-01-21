const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const userRefillRouter = require('./userRefillRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const dealRouter = require('./dealRouter')
const chatRouter = require('./chatRouter')

router.use('/user', userRouter)
router.use('/refill', userRefillRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/deal', dealRouter)
router.use('/chat', chatRouter)

module.exports = router
