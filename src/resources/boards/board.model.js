const uuid = require('uuid');
const mongoose = require('mongoose');

class BoardMemory {
  constructor({ title = 'default title', columns = [] }) {
    this.id = uuid();
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    return board;
  }
}

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: Array,
    _id: { type: String, default: uuid }
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { title, columns } = board;
  return { id: board._id, title, columns };
};

const BoardDB = mongoose.model('Board', boardSchema);

const Board = process.env.STORAGE_MODE === 'memory' ? BoardMemory : BoardDB;

module.exports = Board;
