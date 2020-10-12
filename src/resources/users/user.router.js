const userRouter = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

userRouter.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

userRouter.route('/:id').get(async (req, res) => {
  const userWithId = await usersService.getUser(req.params.id);
  if (userWithId) {
    res.status(200).json(User.toResponse(userWithId));
  } else {
    const error = new Error();
    error.status = 404;
    throw error;
  }
});

userRouter.route('/').post(async (req, res) => {
  const user = await usersService.addUser(req.body);
  res.status(200).json(User.toResponse(user));
});

userRouter.route('/:id').put(async (req, res) => {
  const user = await usersService.updateUser(req.params.id, req.body);
  if (user) {
    await res.status(200).json(User.toResponse(user));
  } else {
    const error = new Error();
    error.status = 401;
    throw error;
  }
});

module.exports = userRouter;
