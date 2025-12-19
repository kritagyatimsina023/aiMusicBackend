const express = require('express');
const {
  getAllUser,
  createUser,
  verifyExisting,
} = require('../controllers/userController');

const Router = express.Router();
Router.post('/create-user', verifyExisting, createUser);
Router.route('/').get(getAllUser);

module.exports = Router;
