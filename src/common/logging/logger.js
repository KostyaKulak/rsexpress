const { INFO_LOG, ERROR_LOG } = require('./log.types');
const { ReqInfo } = require('./reqInfo');
const { createLogger, format, transports } = require('winston');

const logFormat = format.combine(
  format.colorize(),
  format.cli(),
  format.json()
);

const logger = createLogger({
  level: 'silly',
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
    })
  ]
});

const logReqInfo = req => {
  logger.info(JSON.stringify(new ReqInfo(req.url, req.params, req.body)));
};

module.exports = { logger, logReqInfo };
