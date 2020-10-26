const boardsRepo = require('./board.memory.repository');
const taskService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();
const addBoard = data => boardsRepo.addBoard(data);
const getBoardById = id => boardsRepo.getBoardById(id);
const updateBoard = (id, data) => {
  return boardsRepo.updateBoard(id, data);
};
const deleteBoard = async id => {
  if (await boardsRepo.deleteBoard(id)) {
    await taskService.deleteTasksByBoardId(id);
    return true;
  }
  return false;
};

module.exports = {
  getAll,
  addBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
