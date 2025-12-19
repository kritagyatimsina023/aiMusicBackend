const express = require('express');
const {
  getAllReview,
  createReview,
  editReview,
  deleteReview,
} = require('../controllers/reviewControllers');

const Router = express.Router();

Router.route('/').get(getAllReview).post(createReview);
Router.route('/:id').patch(editReview).delete(deleteReview);
module.exports = Router;
