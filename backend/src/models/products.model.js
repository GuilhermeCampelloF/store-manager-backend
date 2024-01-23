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

// ATUALIZAR UM PRODUTO
const updateProducts = async (id, name) => {
  await connection.execute('UPDATE products SET name = ? WHERE id = ?', [name, id]);
  return { id: Number(id), name };
};

// DELETAR UM PRODUTO
const deleteProduct = async (id) => {
  await connection.execute('DELETE FROM products WHERE id = ?', [id]);
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProducts,
  updateProducts,
  deleteProduct,
};