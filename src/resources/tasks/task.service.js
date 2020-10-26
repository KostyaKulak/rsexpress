const taskRepo =
  process.env.STORAGE_MODE === 'memory'
    ? require('./task.memory.repository')
    : require('./task.db.repository');

const getTasksByBoardId = boardId => taskRepo.getTasksByBoardId(boardId);
const getAll = () => taskRepo.getAll();
const getTasksByBoardTaskIds = (boardId, taskId) =>
  taskRepo.getTasksByBoardTaskIds(boardId, taskId);

const addTask = (boardId, task) => taskRepo.addTask(boardId, task);

const deleteTasksByBoardId = boardId => taskRepo.deleteTasksByBoardId(boardId);
const updateTask = (boardId, taskId, data) =>
  taskRepo.updateTask(boardId, taskId, data);
const deleteTask = taskId => taskRepo.deleteTask(taskId);
const deleteUserFromTasks = userId => taskRepo.deleteUserFromTasks(userId);

module.exports = {
  getTasksByBoardId,
  getAll,
  getTasksByBoardTaskIds,
  addTask,
  deleteTasksByBoardId,
  updateTask,
  deleteTask,
  deleteUserFromTasks
};
