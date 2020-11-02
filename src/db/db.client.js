const mongoose = require('mongoose');
const { logger } = require('../common/logging/logger');
const userService = require('../resources/users/user.service');

const connect = runServer => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', () => logger.error('Connection error'));
  db.once('open', () => {
    logger.info('Connected to DB');
    runServer();
    userService.addUser({
      name: 'admin',
      login: 'admin',
      password: 'admin'
    });
  });
};

module.exports = { connect };
