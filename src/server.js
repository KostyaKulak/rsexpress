const { PORT } = require('./common/config');
const app = require('./app');
const { logger } = require('./common/logging/logger');

logger.info(`Storage mode is ${process.env.STORAGE_MODE}`);

if (process.env.STORAGE_MODE === 'db') {
  const { connect } = require('./db/db.client');
  connect();
}

app.listen(PORT, () =>
  logger.info(`App is running on http://localhost:${PORT}`)
);
