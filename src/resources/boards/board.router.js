const boardRouter = require('express').Router();
const boardsService = require('./board.service');
const Board = require('./board.model');
const { catchErrors } = require('../../utils/error.handler');
const { throw401, throw404 } = require('../../utils/error.utils');

boardRouter.route('/').get(
  catchErrors(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })
);

boardRouter.route('/:id').get(
  catchErrors(async (req, res) => {
    const board = await boardsService.getBoardById(req.params.id);
    if (board) {
      res.json(Board.toResponse(board));
    } else {
      throw404(res);
    }
  })
);

boardRouter.route('/').post(
  catchErrors(async (req, res) => {
    const board = await boardsService.addBoard(req.body);
    res.status(200).json(Board.toResponse(board));
  })
);

boardRouter.route('/:id').put(
  catchErrors(async (req, res) => {
    const board = await boardsService.updateBoard(req.params.id, req.body);
    if (board) {
      res.status(200).json(Board.toResponse(board));
    } else {
      throw401();
    }
  })
);

boardRouter.route('/:id').delete(
  catchErrors(async (req, res) => {
    const isDeleted = await boardsService.deleteBoard(req.params.id);
    if (isDeleted) {
      res.status(204).json();
    } else {
      throw404();
    }
  })
);

module.exports = boardRouter;
