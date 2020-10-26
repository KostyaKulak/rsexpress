const taskRouter = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const Task = require('./task.model');
const { catchErrors } = require('../../utils/error.handler');
const { throw404 } = require('../../utils/error.utils');

taskRouter.route('/').get(
  catchErrors(async (req, res) => {
    const tasks = await taskService.getTasksByBoardId(req.params.boardId);
    res.status(200).json(tasks.map(Task.toResponse));
  })
);

taskRouter.route('/:taskId').get(
  catchErrors(async (req, res) => {
    const task = await taskService.getTasksByBoardTaskIds(
      req.params.boardId,
      req.params.taskId
    );
    if (task) {
      res.status(200).json(Task.toResponse(task));
    } else {
      throw404(res);
    }
  })
);

taskRouter.route('/').post(
  catchErrors(async (req, res) => {
    const task = await taskService.addTask(req.params.boardId, req.body);
    res.json(Task.toResponse(task));
  })
);

taskRouter.route('/:taskId').put(
  catchErrors(async (req, res) => {
    const task = await taskService.updateTask(
      req.params.boardId,
      req.params.taskId,
      req.body
    );
    if (task) {
      res.status(200).json(Task.toResponse(task));
    } else {
      throw404(res);
    }
  })
);

taskRouter.route('/:taskId').delete(
  catchErrors(async (req, res) => {
    const isDeleted = await taskService.deleteTask(req.params.taskId);
    if (isDeleted) {
      res.status(204).json();
    } else {
      throw404();
    }
  })
);

module.exports = taskRouter;
