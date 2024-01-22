const { salesModel } = require('../models/index');
const validators = require('./validations/validationsInputValues');

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

const insertSale = async (sales) => {
  const validationError = validators.validateNewSale(sales);
  if (validationError) {
    return { status: validationError.status, data: { message: validationError.message } };
  }
  try {
    const promises = sales.map(async (product) => {
      const { productId } = product;
      const productFromModel = await saleById(productId);
      if (productFromModel.status === 'NOT_FOUND') {
        throw new Error('Product not found');
      }
    });
    await Promise.all(promises);
  } catch (error) {
    return { status: 'NOT_FOUND', data: { message: error.message } };
  }
  const newSale = await salesModel.insertSales(sales);
  return { status: 'CREATED', data: newSale };
};

module.exports = {
  allSales,
  saleById,
  insertSale,
};

// if (!sale || sale.length === 0) {
//   return { status: 'BAD_REQUEST', data: { message: 'Invalid sale value' } };
// }