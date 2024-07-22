const { newProductSchema,
  newSaleSchema,
  updateProductSchema,
  quantitySchema } = require('./schemas');

const validateNewProduct = (name) => {
  const { error } = newProductSchema.validate(name);
  if (error) {
    return { status: error.message.includes('required') ? 'BAD_REQUEST' : 'INVALID_VALUE',
      message: error.message };
  }
};

const validateUpdateProduct = (product) => {
  const { error } = updateProductSchema.validate(product);
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

const validateQuantity = (quantity) => {
  const { error } = quantitySchema.validate(quantity);
  if (error) {
    return { status: error.message.includes('required') ? 'BAD_REQUEST' : 'INVALID_VALUE',
      message: error.message };
  }
};

module.exports = {
  validateNewProduct,
  validateNewSale,
  validateUpdateProduct,
  validateQuantity,
};
