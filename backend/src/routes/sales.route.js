const route = require('express').Router();
const { salesController } = require('../controllers/index');

route.get('/', salesController.getSales);
route.get('/:id', salesController.getSaleById);

module.exports = route;