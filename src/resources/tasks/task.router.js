const taskRouter = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const { throw404 } = require('../../utils/error-handler');

taskRouter.route('/').get(async (req, res) => {
  const tasks = await taskService.getTasksByBoardId(req.params.boardId);
  res.status(200).json(tasks);
});

taskRouter.route('/:taskId').get(async (req, res) => {
  const task = await taskService.getTasksByBoardTaskIds(
    req.params.boardId,
    req.params.taskId
  );
  if (task) {
    res.status(200).json(task);
  } else {
    throw404(res);
  }
});

taskRouter.route('/').post(async (req, res) => {
  const task = await taskService.addTask(req.params.boardId, req.body);
  res.json(task);
});

taskRouter.route('/:taskId').put(async (req, res) => {
  const task = await taskService.updateTask(
    req.params.boardId,
    req.params.taskId,
    req.body
  );
  if (task) {
    res.status(200).json(task);
  } else {
    throw404(res);
  }
});

taskRouter.route('/:taskId').delete(async (req, res) => {
  const isDeleted = await taskService.deleteTask(req.params.taskId);
  if (isDeleted) {
    res.status(204).json();
  } else {
    throw404();
  }
});

module.exports = taskRouter;
