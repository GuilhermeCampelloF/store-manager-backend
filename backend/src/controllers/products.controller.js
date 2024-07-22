const { productsService } = require('../services/index');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getProducts = async (_req, res) => {
  const { status, data } = await productsService.allProducts();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.productById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const insertNewProduct = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await productsService.insertProducts(name);
  return res.status(mapStatusHTTP(status)).json(data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { status, data } = await productsService.updateProduct(id, name);
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.deleteProduct(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const searchProduct = async (req, res) => {
  const { q } = req.query;
  const { status, data } = await productsService.searchProduct(q);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getProducts,
  getProductsById,
  insertNewProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
