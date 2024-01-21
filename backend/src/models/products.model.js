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

// CADASTRAR PRODUTOS
const insertProducts = async (product) => {
  const [{ insertId }] = await
  connection.execute('INSERT INTO products (name) VALUE (?)', [product]);
  return insertId;
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProducts,
};