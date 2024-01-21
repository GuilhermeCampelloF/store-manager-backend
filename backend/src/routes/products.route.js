const route = require('express').Router();
const { productsController } = require('../controllers/index');

route.get('/', productsController.getProducts);
route.get('/:id', productsController.getProductsById);
route.post('/', productsController.insertNewProduct);

module.exports = route;