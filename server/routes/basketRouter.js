const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', basketController.create) //checkRole("ADMIN")
router.delete('/:id', basketController.delete)
router.delete('/user/:basketId', basketController.deleteForUser)
router.get('/:basketId', basketController.getForUser)

module.exports = router
