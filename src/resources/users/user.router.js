const userRouter = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { catchErrors } = require('../../utils/error.handler');
const { throw401 } = require('../../utils/error.utils');
const { throw404 } = require('../../utils/error.utils');

userRouter.route('/').get(
  catchErrors(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

userRouter.route('/:id').get(
  catchErrors(async (req, res) => {
    const userWithId = await usersService.getUser(req.params.id);
    if (userWithId) {
      res.status(200).json(User.toResponse(userWithId));
    } else {
      throw404();
    }
  })
);

userRouter.route('/').post(
  catchErrors(async (req, res) => {
    const user = await usersService.addUser(req.body);
    res.status(200).json(User.toResponse(user));
  })
);

userRouter.route('/:id').put(
  catchErrors(async (req, res) => {
    const user = await usersService.updateUser(req.params.id, req.body);
    if (user) {
      res.status(200).json(User.toResponse(user));
    } else {
      throw401();
    }
  })
);

userRouter.route('/:id').delete(
  catchErrors(async (req, res) => {
    if (await usersService.deleteUser(req.params.id)) {
      res.status(204).json();
    } else {
      throw404();
    }
  })
);

module.exports = userRouter;
