const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', orderController.create) //checkRole("ADMIN")
router.get('/', checkRole("ADMIN"), orderController.getAll)
router.get('/active', checkRole("ADMIN"), orderController.getAllActive)
router.put('/:id', orderController.update)
router.put('/:id/status', orderController.updateStatus)
router.delete('/:id', checkRole("ADMIN"), orderController.delete)

module.exports = router
