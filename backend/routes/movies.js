const movieRouter = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { validateMovieCreation } = require('../middlewares/validators');

movieRouter.get('/', getMovies);
movieRouter.post('/', validateMovieCreation, createMovie);
movieRouter.delete('/:movieId', deleteMovie);

module.exports = movieRouter;
