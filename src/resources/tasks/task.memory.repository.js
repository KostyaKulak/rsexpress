const Task = require('./task.model');

let tasks = [];

const getAll = async () => tasks;

const findTask = async id => {
  return tasks.findIndex(task => task.id === id);
};

const getTasksByBoardId = async boardId => {
  return tasks.filter(task => task.boardId === boardId);
};

const getTasksByBoardTaskIds = async (boardId, taskId) =>
  tasks.find(task => task.id === taskId && task.boardId === boardId);

const addTask = async (boardId, task) => {
  const newTask = new Task(task);
  newTask.boardId = boardId;
  tasks.push(newTask);
  return newTask;
};

const deleteTasksByBoardId = async boardId => {
  tasks = tasks.filter(task => task.boardId !== boardId);
};

const updateTask = async (boardId, taskId, data) => {
  const index = await findTask(taskId);
  if (index < 0) {
    return null;
  }
  tasks[index].title = data.title ? data.title : tasks[index].title;
  tasks[index].order = data.order ? data.order : tasks[index].order;
  tasks[index].description = data.description
    ? data.description
    : tasks[index].description;
  return tasks[index];
};

const deleteTask = async taskId => {
  const index = await findTask(taskId);
  if (index < 0) {
    return false;
  }
  tasks.splice(index, 1);
  return true;
};

const deleteUserFromTasks = async userId => {
  tasks = tasks.map(task => {
    if (task.userId === userId) {
      task.userId = null;
    }
    return task;
  });
};

module.exports = {
  getTasksByBoardId,
  addTask,
  getAll,
  getTasksByBoardTaskIds,
  deleteTasksByBoardId,
  updateTask,
  deleteTask,
  deleteUserFromTasks
};
