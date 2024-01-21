const { newProductSchema } = require('./schemas');

const validateNewProduct = (name) => {
  const { error } = newProductSchema.validate(name);
  if (error) {
    return { status: error.message.includes('required') ? 'BAD_REQUEST' : 'INVALID_VALUE',
      message: error.message };
  }
};

module.exports = {
  validateNewProduct,
};
