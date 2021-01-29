const loginRouter = require('express').Router();
const userService = require('../users/user.service');
const { throw401 } = require('../../utils/error.utils');
const { catchErrors } = require('../../utils/error.handler');

loginRouter.route('/').post(
  catchErrors(async (req, res) => {
    const { login, password } = req.body;
    const token = await userService.getToken(login, password);
    if (token) {
      res.send(token);
    } else {
      throw401();
    }
  })
);

module.exports = loginRouter;
