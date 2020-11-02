const mongoose = require('mongoose');
const { logger } = require('../common/logging/logger');

const connect = () => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', () => logger.error('Connection error'));
  db.once('open', () => logger.info('Connected to DB'));
};

module.exports = { connect };
