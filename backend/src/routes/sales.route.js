const route = require('express').Router();
const { salesController } = require('../controllers/index');

route.get('/', salesController.getSales);

module.exports = route;