const Router = require('express')
const router = new Router()

const itemRouter = require('./itemRouter')
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const basketRouter = require('./basketRouter')
const orderRouter = require('./orderRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/item', itemRouter)
router.use('/basket', basketRouter)
router.use('/order', orderRouter)


module.exports = router

