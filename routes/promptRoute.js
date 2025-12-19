const express = require('express');
const {
  getAllPrompt,
  createPrompt,
  getUserAllPrompt,
} = require('../controllers/promptControllers');

const Router = express.Router();
Router.route('/:id').get(getUserAllPrompt);
Router.route('/').get(getAllPrompt).post(createPrompt);

module.exports = Router;
