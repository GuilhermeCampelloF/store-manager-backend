const { productsModel } = require('../models/index');

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

module.exports = {
  allProducts,
  productById,
};