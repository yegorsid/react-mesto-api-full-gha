const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const DataNotFoundError = require('../errors/DataNotFoundError');

router.use('/api/users', usersRouter);
router.use('/api/cards', cardsRouter);
router.use('/api/*', (req, res, next) => {
  next(new DataNotFoundError('Not found'));
});

module.exports = router;
