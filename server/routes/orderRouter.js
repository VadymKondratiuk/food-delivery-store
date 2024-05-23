const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', orderController.create) //checkRole("ADMIN")
router.get('/', orderController.getAll)
router.get('/active', orderController.getAllActive)
router.put('/:id', orderController.update)
router.put('/:id/status', orderController.updateStatus)
router.delete('/:id', orderController.delete)

module.exports = router
