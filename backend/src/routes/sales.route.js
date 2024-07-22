const route = require('express').Router();
const { salesController } = require('../controllers/index');

route.get('/', salesController.getSales);
route.get('/:id', salesController.getSaleById);
route.post('/', salesController.insertNewSale);
route.delete('/:id', salesController.deleteSale);
route.put('/:saleId/products/:productId/quantity', salesController.updateQuantity);

module.exports = route;