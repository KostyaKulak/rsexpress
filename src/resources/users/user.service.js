const usersRepo =
  process.env.STORAGE_MODE === 'memory'
    ? require('./user.memory.repository')
    : require('./user.db.repository');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();
const getUser = id => usersRepo.getUser(id);
const addUser = user => usersRepo.addUser(user);
const updateUser = (id, user) => usersRepo.updateUser(id, user);
const deleteUser = async id => {
  if (await usersRepo.deleteUser(id)) {
    await taskService.deleteUserFromTasks(id);
    return true;
  }
  return false;
};

module.exports = { getAll, getUser, updateUser, addUser, deleteUser };
