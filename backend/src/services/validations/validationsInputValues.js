const { newProductSchema, newSaleSchema } = require('./schemas');

const validateNewProduct = (name) => {
  const { error } = newProductSchema.validate(name);
  if (error) {
    return { status: error.message.includes('required') ? 'BAD_REQUEST' : 'INVALID_VALUE',
      message: error.message };
  }
};

const validateNewSale = (sale) => {
  const { error } = newSaleSchema.validate(sale);
  if (error) {
    return { status: error.message.includes('required') ? 'BAD_REQUEST' : 'INVALID_VALUE',
      message: error.message };
  }
};

module.exports = {
  validateNewProduct,
  validateNewSale,
};
