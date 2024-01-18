const connection = require('./connection');

// RETORNA TODOS OS PRODUTOS
const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

// RETORNA PRODUTOS PELO ID
const getProductById = async (id) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
};