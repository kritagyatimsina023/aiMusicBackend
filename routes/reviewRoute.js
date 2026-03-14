const express = require('express');
const {
  getAllReview,
  createReview,
  editReview,
  deleteReview,
  getUserReview,
} = require('../controllers/reviewControllers');

const Router = express.Router();

Router.route('/').get(getAllReview).post(createReview);
Router.route('/:id').patch(editReview).delete(deleteReview);
Router.route('/user/:userId').get(getUserReview);
module.exports = Router;
