const router = require('express').Router();
const controllers = require('../controllers/cards');

router.get('/', controllers.getCards);
router.post('/', controllers.postCard);
router.delete('/:_id', controllers.deleteCard);
router.put('/:_id/likes', controllers.likeCard);
router.delete('/:_id/likes', controllers.dislikeCard);

module.exports = router;
