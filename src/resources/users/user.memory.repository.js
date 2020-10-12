const User = require('./user.model');
const users = [];

const getAll = async () => {
  return users;
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
  const index = users.findIndex(user => user.id === id);
  if (index < 0) {
    return null;
  }
  users[index].name = data.name ? data.name : users[index].name;
  users[index].login = data.login ? data.login : users[index].login;
  users[index].password = data.password ? data.password : users[index].password;
  return users[index];
};

module.exports = { getAll, addUser, getUser, updateUser };
