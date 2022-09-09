const router = require('express').Router()
const EmpController = require('../controllers/emp-controller');
// const isAuthorized = require('../middlewares/auth-middleware')

// user routing paths
router.route('/').get(EmpController.read)
router.route('/:empId').get(EmpController.readSingle)
router.route('/').post(EmpController.create)
router.route('/:empId').put(EmpController.update)
router.route('/:empId').delete(EmpController.delete)
// router.route('/:empId').delete(EmpController.delete)
// router.route('/delete').post(isAuthorized, EmpController.delete)
// router.route('/forgot_password').get(EmpController.forgot_password)

module.exports = router;