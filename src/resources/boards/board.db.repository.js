const Board = require('./board.model');

const getAll = async () => Board.find({});

const getBoardById = async id => Board.findOne({ _id: id });

const addBoard = async board => Board.create(board);

const updateBoard = async (id, data) => Board.updateOne({ _id: id }, data);

const deleteBoard = async id =>
  (await Board.deleteOne({ _id: id })).deletedCount;

module.exports = {
  getAll,
  getBoardById,
  addBoard,
  updateBoard,
  deleteBoard
};
