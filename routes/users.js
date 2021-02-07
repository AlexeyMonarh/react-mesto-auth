const router = require('express').Router();
const controllers = require('../controllers/users');

router.get('/', controllers.getUsers);
router.get('/:_id', controllers.getUser);
router.post('/', controllers.postUser);
router.patch('/me', controllers.patchUser);
router.patch('/me/avatar', controllers.patchAva);

module.exports = router;
