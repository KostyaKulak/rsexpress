const Board = require('./board.model');
const uuid = require('uuid');

const boards = [];

const getAll = async () => {
  return boards;
};

const findBoard = async id => {
  return boards.findIndex(board => board.id === id);
};

const getBoardById = async id => {
  return boards.find(board => board.id === id);
};

const addBoard = async board => {
  const newBoard = new Board(board);
  for (let i = 0; i < newBoard.columns.length; i++) {
    newBoard.columns[i].id = uuid();
  }
  boards.push(newBoard);
  return newBoard;
};

const updateBoard = async (id, data) => {
  const index = await findBoard(id);
  if (index < 0) {
    return null;
  }
  boards[index].title = data.title ? data.title : boards[index].title;
  boards[index].columns = data.columns ? data.columns : boards[index].columns;
  return boards[index];
};

const deleteBoard = async id => {
  const index = await findBoard(id);
  if (index < 0) {
    return false;
  }
  boards.splice(index, 1);
  return true;
};

module.exports = {
  getAll,
  getBoardById,
  addBoard,
  updateBoard,
  deleteBoard
};
