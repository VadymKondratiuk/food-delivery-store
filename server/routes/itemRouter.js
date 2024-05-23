const Router = require('express')
const router = new Router()
const itemController = require('../controllers/itemController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', itemController.create) //checkRole("ADMIN")
router.get('/', itemController.getAll)
router.get('/:id', itemController.getOne)
router.put('/:id', itemController.update)
router.delete('/:id', itemController.delete)



module.exports = router
