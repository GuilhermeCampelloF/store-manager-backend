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

const updateProduct = async (id, name) => {
  const validationError = validators.validateUpdateProduct({ name });
  if (validationError) {
    return { status: validationError.status, data: { message: validationError.message } };
  }
  const getProduct = await productsModel.getProductById(id);
  if (!getProduct) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  const productToUpdate = await productsModel.updateProducts(id, name);
  return { status: 'SUCCESSFUL', data: productToUpdate };
};

const deleteProduct = async (id) => {
  const productToDelete = await productsModel.getProductById(id);
  if (!productToDelete) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  await productsModel.deleteProduct(id);
  return { status: 'NO_CONTENT', data: null };
};

const searchProduct = async (term) => {
  const products = await productsModel.searchProduct(term);
  return { status: 'SUCCESSFUL', data: products };
};

module.exports = {
  allProducts,
  productById,
  insertProducts,
  updateProduct,
  deleteProduct,
  searchProduct,
};