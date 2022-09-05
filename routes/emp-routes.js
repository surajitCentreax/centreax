const router = require('express').Router()
const EmpController = require('../controllers/emp-controller');
// const isAuthorized = require('../middlewares/auth-middleware')

// user routing paths
router.route('/').get(EmpController.read)
router.route('/').post(EmpController.create)
// router.route('/update').get(EmpController.update)
// router.route('/delete').post(EmpController.delete)
// router.route('/delete').post(isAuthorized, EmpController.delete)
// router.route('/forgot_password').get(EmpController.forgot_password)

module.exports = router;