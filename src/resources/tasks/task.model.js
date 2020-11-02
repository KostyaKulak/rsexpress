const uuid = require('uuid');
const mongoose = require('mongoose');

class TaskMemory {
  constructor({ title, order, description, userId, boardId, columnId }) {
    this.id = uuid();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    return task;
  }
}

const taskSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String,
    _id: { type: String, default: uuid }
  },
  { versionKey: false }
);

taskSchema.statics.toResponse = task => {
  const { title, order, description, userId, boardId, columnId } = task;
  return { id: task._id, title, order, description, userId, boardId, columnId };
};

const TaskDB = mongoose.model('Task', taskSchema);
const Task = process.env.STORAGE_MODE === 'memory' ? TaskMemory : TaskDB;
module.exports = Task;
