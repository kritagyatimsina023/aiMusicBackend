const express = require('express');
const { insertOutput, getOutput } = require('../controllers/outputControllers');

const Router = express.Router();
Router.route('/').post(insertOutput);
Router.route('/:id/:promptId').get(getOutput);

module.exports = Router;
