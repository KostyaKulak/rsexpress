const User = require('./user.model');

const getAll = () => {
  return User.find({});
};

const getUser = async id => {
  return User.findOne({ _id: id });
};

const addUser = async user => {
  return User.create(user);
};

const updateUser = async (id, data) => {
  return User.updateOne({ _id: id }, data);
};

const deleteUser = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
};

module.exports = {
  getAll,
  addUser,
  getUser,
  updateUser,
  deleteUser
};
