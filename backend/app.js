require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validateUserCreation, validateLogin } = require('./middlewares/validators');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const app = express();
const { PORT = 3000, DATABASE = 'mongodb://0.0.0.0:27017/bitfilmsdb' } = process.env;

app.use(express.json());

app.use(requestLogger);

app.use(cors);

app.post('/signin', validateLogin, login);
app.post('/signup', validateUserCreation, createUser);

app.use(auth);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'Server error' : message,
  });
  return next();
});

mongoose.connect(DATABASE, {});

app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});
