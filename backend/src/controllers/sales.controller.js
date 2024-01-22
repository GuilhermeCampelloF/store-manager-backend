const { salesService } = require('../services/index');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getSales = async (_req, res) => {
  const { status, data } = await salesService.allSales();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.saleById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const insertNewSale = async (req, res) => {
  const newProducts = req.body;
  const { status, data } = await salesService.insertSale(newProducts);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getSales,
  getSaleById,
  insertNewSale,
};