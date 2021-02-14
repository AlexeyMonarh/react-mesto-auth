const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
// router.use('/sign-up', );
// router.use('/sign-in', );
router.use('*', (req, res) => {
  res.status(500).send({ message: 'На сервере произошла ошибка!' });
});

module.exports = router;
