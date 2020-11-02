const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const taskRouter = require('./resources/tasks/task.router');
const boardRouter = require('./resources/boards/board.router');
const { errorHandler } = require('./utils/error.handler');
const { logReqInfo } = require('./common/logging/logger');
const { exit } = process;
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

process
  .on('unhandledRejection', errorHandler)
  .on('uncaughtException', err => errorHandler(err).then(() => exit(1)));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(errorHandler);
app.use(logReqInfo);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

module.exports = app;
