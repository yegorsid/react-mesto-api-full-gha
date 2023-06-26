const userRouter = require('express').Router();
const { validateUserUpdate } = require('../middlewares/validators');

const {
  getUserById,
  updateUser,
} = require('../controllers/users');

userRouter.get('/me', getUserById);
userRouter.patch('/me', validateUserUpdate, updateUser);

module.exports = userRouter;
