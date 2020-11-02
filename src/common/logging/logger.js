const { INFO_LOG, ERROR_LOG, DEBUG_LOG } = require('./log.types');
const { createLogger, format, transports } = require('winston');
const expressWinston = require('express-winston');

const logFormat = format.combine(
  format.colorize(),
  format.cli(),
  format.json()
);

const options = {
  level: DEBUG_LOG.level,
  format: format.combine(format.colorize(), format.cli()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: ERROR_LOG.file,
      level: ERROR_LOG.level,
      format: logFormat
    }),
    new transports.File({
      filename: INFO_LOG.file,
      level: INFO_LOG.level,
      format: logFormat
    }),
    new transports.File({
      filename: DEBUG_LOG.file,
      level: DEBUG_LOG.level,
      format: logFormat
    })
  ]
};

const logger = createLogger(options);

module.exports = { logger, logReqInfo: expressWinston.logger(options) };
