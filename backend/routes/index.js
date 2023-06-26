const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const DataNotFoundError = require('../errors/DataNotFoundError');

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('/*', (req, res, next) => {
  next(new DataNotFoundError('Not found'));
});

module.exports = router;
