const uuid = require('uuid');
const mongoose = require('mongoose');

class UserMemory {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id || uuid();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: String,
    password: String,
    _id: { type: String, default: uuid }
  },
  { versionKey: false }
);

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const UserDB = mongoose.model('User', userSchema);

const User = process.env.STORAGE_MODE === 'memory' ? UserMemory : UserDB;

module.exports = User;
