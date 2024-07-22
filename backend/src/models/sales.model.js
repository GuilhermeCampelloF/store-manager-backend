const connection = require('./connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(`SELECT
  sale_id AS saleId,
  date,
  product_id
  AS productId,
  quantity
  FROM sales AS s 
  INNER JOIN sales_products AS sp ON s.id = sp.sale_id`);
  return sales;
};

const getSaleById = async (id) => {
  const [sale] = await connection.execute(`SELECT
  date,
  product_id AS productId,
  quantity
  FROM sales AS s 
  INNER JOIN sales_products AS sp ON s.id = sp.sale_id
  WHERE s.id = ?`, [id]);
  return sale;
};

const insertSales = async (sales) => {
  const [{ insertId: saleId }] = await connection.execute(`INSERT INTO
  sales (date) VALUES (NOW ())`);
  const promises = sales.map(async (product) => {
    const { productId, quantity } = product;
    await connection.execute(`INSERT INTO
    sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)`, [saleId, productId, quantity]);
  });
  await Promise.all(promises);
  return {
    id: saleId,
    itemsSold: sales,
  };
};

const deleteSale = async (id) => {
  await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSales,
  deleteSale,
};