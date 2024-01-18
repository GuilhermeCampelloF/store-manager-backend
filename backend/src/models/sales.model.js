const connection = require('./connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(`SELECT
  sale_id AS saleId,
  date,
  product_id
  AS productId,
  quantity
  FROM sales AS s 
  INNER JOIN sales_products AS sp WHERE s.id = sp.sale_id`);
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

module.exports = {
  getAllSales,
  getSaleById,
};