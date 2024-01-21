const { productsModel } = require('../models/index');
const validators = require('./validations/validationsInputValues');

const allProducts = async () => {
  const products = await productsModel.getAllProducts();
  return { status: 'SUCCESSFUL', data: products };
};

const productById = async (id) => {
  const product = await productsModel.getProductById(id);
  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } }; 
  }
  return { status: 'SUCCESSFUL', data: product }; 
};

const insertProducts = async (product) => {
  const error = validators.validateNewProduct(product);
  if (error) {
    return { status: error.status, data: { message: error.message } };
  }
  const newProduct = await productsModel.insertProducts(product);
  const newProductData = await productsModel.getProductById(newProduct);
  return { status: 'CREATED', data: newProductData };
};

module.exports = {
  allProducts,
  productById,
  insertProducts,
};