const taskRouter = require('express').Router();
const taskService = require('./task.service');
const { throw404 } = require('../../utils/error-handler');

taskRouter.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await taskService.getTasksByBoardId(req.params.boardId);
  await res.status(200).json(tasks);
});

taskRouter.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const task = await taskService.getTasksByBoardTaskIds(
    req.params.boardId,
    req.params.taskId
  );
  if (task) {
    await res.status(200).json(task);
  } else {
    throw404();
  }
});

taskRouter.route('/:boardId/tasks').post(async (req, res) => {
  const task = await taskService.addTask(req.params.boardId, req.body);
  res.json(task);
});

taskRouter.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const task = await taskService.updateTask(
    req.params.boardId,
    req.params.taskId,
    req.body
  );
  if (task) {
    await res.status(200).json(task);
  } else {
    throw404();
  }
});

taskRouter.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  if (await taskService.deleteTask(req.params.taskId)) {
    res.status(204).json();
  } else {
    throw404();
  }
});

module.exports = taskRouter;
