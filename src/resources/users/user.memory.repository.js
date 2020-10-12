const User = require('./user.model');
const taskService = require('../tasks/task.service');
const users = [];

const getAll = async () => {
  return users;
};

const findUser = id => {
  return users.findIndex(user => user.id === id);
};

const addUser = async user => {
  const newUser = new User({
    name: user.name,
    login: user.login,
    password: user.password
  });
  users.push(newUser);
  return newUser;
};

const getUser = async id => {
  return users.find(user => user.id === id);
};

const updateUser = async (id, data) => {
  const index = findUser(id);
  if (index < 0) {
    return null;
  }
  users[index].name = data.name ? data.name : users[index].name;
  users[index].login = data.login ? data.login : users[index].login;
  users[index].password = data.password ? data.password : users[index].password;
  return users[index];
};

const deleteUser = async id => {
  const index = findUser(id);
  if (index < 0) {
    return false;
  }
  users.splice(index, 1);
  await taskService.deleteUserFromTasks(id);
  return true;
};

module.exports = { getAll, addUser, getUser, updateUser, deleteUser };
