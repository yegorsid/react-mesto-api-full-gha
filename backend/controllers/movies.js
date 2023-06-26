const movieSchema = require('../models/movie');

const InvalidDataError = require('../errors/InvalidDataError');
const NoRightsError = require('../errors/NoRightsError');
const DataNotFoundError = require('../errors/DataNotFoundError');

module.exports.getMovies = (req, res, next) => {
  movieSchema
    .find({})
    .then((movies) => res.send(movies.reverse()))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const owner = req.user._id;

  movieSchema
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidDataError('Error appears when create movie'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  movieSchema
    .findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new DataNotFoundError('Nothing to delete');
      }
      if (!movie.owner.equals(req.user._id)) {
        return next(new NoRightsError('Forbidden'));
      }

      return movie.deleteOne().then(() => res.send({ message: 'Deleted' }));
    })
    .catch(next);
};
