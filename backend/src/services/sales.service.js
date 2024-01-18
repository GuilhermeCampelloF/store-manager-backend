const { salesModel } = require('../models/index');

const allSales = async () => {
  const sales = await salesModel.getAllSales();
  return { status: 'SUCCESSFUL', data: sales };
};

module.exports = {
  allSales,
};