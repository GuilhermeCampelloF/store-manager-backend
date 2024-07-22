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

const updateQuantity = async (saleId, productId, quantity) => {
  await connection.execute(`UPDATE sales_products SET quantity = ? 
    WHERE sale_id = ? AND product_id = ?`, [quantity, saleId, productId]);
  
  const [[sale]] = await connection.execute(`SELECT
    date,
    product_id AS productId,
    quantity,
    sale_id AS saleId
    FROM sales_products
    INNER JOIN sales
    ON sales_products.sale_id = sales.id
    WHERE sale_id = ? AND product_id = ? ORDER BY product_id ASC`, [saleId, productId]);

  return sale;
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSales,
  deleteSale,
  updateQuantity,
};