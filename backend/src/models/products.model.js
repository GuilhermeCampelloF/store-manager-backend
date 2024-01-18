const connection = require('./connection');

// RETORNA TODOS OS PRODUTOS
const allProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

// RETORNA PRODUTOS PELO ID
const productsById = async (id) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product;
};

module.exports = {
  allProducts,
  productsById,
};