const Router = require('express')
const router = new Router()
const itemController = require('../controllers/itemController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole("ADMIN"), itemController.create) 
router.get('/', itemController.getAll)
router.get('/:id', itemController.getOne)
router.put('/:id', checkRole("ADMIN"), itemController.update)
router.delete('/:id', checkRole("ADMIN"), itemController.delete)

module.exports = router
