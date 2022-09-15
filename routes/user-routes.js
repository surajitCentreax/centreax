const router = require('express').Router()
const UserController = require('../controllers/user-controller');
// const isAuthorized = require('../middlewares/auth-middleware')

// user routing paths
router.route('/register').post(UserController.register)
router.route('/login').post(UserController.login)
router.route('/logout').post(UserController.logout)

module.exports = router;