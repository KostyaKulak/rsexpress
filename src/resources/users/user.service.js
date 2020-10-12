const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getUser = id => usersRepo.getUser(id);
const addUser = user => usersRepo.addUser(user);
const updateUser = (id, user) => usersRepo.updateUser(id, user);

module.exports = { getAll, getUser, updateUser, addUser };
