const { salesModel } = require('../models/index');

const allSales = async () => {
  const sales = await salesModel.getAllSales();
  return { status: 'SUCCESSFUL', data: sales };
};

const saleById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  if (!sale || sale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } }; 
  }
  return { status: 'SUCCESSFUL', data: sale }; 
};

module.exports = {
  allSales,
  saleById,
};