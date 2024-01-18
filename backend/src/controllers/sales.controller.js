const { salesService } = require('../services/index');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getSales = async (_req, res) => {
  const { status, data } = await salesService.allSales();
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getSales,
};