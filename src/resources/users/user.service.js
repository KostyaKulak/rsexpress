const usersRepo =
  process.env.STORAGE_MODE === 'memory'
    ? require('./user.memory.repository')
    : require('./user.db.repository');
const taskService = require('../tasks/task.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { throw403 } = require('../../utils/error.utils');
const { throw401 } = require('../../utils/error.utils');
const { catchErrors } = require('../../utils/error.handler');
const saltRounds = 10;
// eslint-disable-next-line no-sync
const salt = bcrypt.genSaltSync(saltRounds);
const getAll = () => usersRepo.getAll();
const getUser = id => usersRepo.getUser(id);
const addUser = user => {
  // eslint-disable-next-line no-sync
  user.password = bcrypt.hashSync(user.password, salt);
  return usersRepo.addUser(user);
};
const updateUser = (id, user) => usersRepo.updateUser(id, user);
const deleteUser = async id => {
  if (await usersRepo.deleteUser(id)) {
    await taskService.deleteUserFromTasks(id);
    return true;
  }
  return false;
};
const getToken = async (login, password) => {
  if (!login || !password) {
    return null;
  }
  // eslint-disable-next-line no-sync
  password = bcrypt.hashSync(password, salt);
  const user = await usersRepo.getPasswordByUser(login, password);
  if (user) {
    const id = user._id ? user._id : user.id;
    const payload = { sub: id, login };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 10000
    });
    return { token };
  }
  throw403();
};

const checkToken = catchErrors(async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, err => {
      if (err) {
        throw401();
      } else {
        return next();
      }
    });
  } else {
    throw401();
  }
});

module.exports = {
  getAll,
  getUser,
  updateUser,
  addUser,
  deleteUser,
  getToken,
  checkToken
};
