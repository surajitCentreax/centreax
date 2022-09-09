const router = require('express').Router()
const EventController = require('../controllers/event-controller');
// const isAuthorized = require('../middlewares/auth-middleware')

// user routing paths
router.route('/').get(EventController.read)
router.route('/').post(EventController.create)

module.exports = router;