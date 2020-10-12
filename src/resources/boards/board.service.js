const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const addBoard = data => boardsRepo.addBoard(data);
const getBoardById = id => boardsRepo.getBoardById(id);
const updateBoard = (id, data) => {
  return boardsRepo.updateBoard(id, data);
};
const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = {
  getAll,
  addBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
