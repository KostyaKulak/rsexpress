const boardRouter = require('express').Router();
const boardsService = require('./board.service');
const { throw401, throw404 } = require('../../utils/error-handler');

boardRouter.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

boardRouter.route('/:id').get(async (req, res) => {
  const board = await boardsService.getBoardById(req.params.id);
  if (board) {
    res.json(board);
  } else {
    throw404();
  }
});

boardRouter.route('/').post(async (req, res) => {
  const board = await boardsService.addBoard(req.body);
  res.status(200).json(board);
});

boardRouter.route('/:id').put(async (req, res) => {
  const board = await boardsService.updateBoard(req.params.id, req.body);
  if (board) {
    res.status(200).json(board);
  } else {
    throw401();
  }
});

boardRouter.route('/:id').delete(async (req, res) => {
  if (await boardsService.deleteBoard(req.params.id)) {
    res.status(204).json();
  } else {
    throw404();
  }
});

module.exports = boardRouter;
