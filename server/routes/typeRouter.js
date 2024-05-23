const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', typeController.create) //checkRole("ADMIN")
router.get('/', typeController.getAll)
router.put('/:id', typeController.update)
router.delete('/:id', typeController.delete)

module.exports = router