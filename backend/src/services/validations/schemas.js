const Joi = require('joi');

const productIdSchema = Joi.number().required().messages({
  'any.required': '"productId" is required',
});

const quantitySchema = Joi.number().required().min(1)
  .messages({
    'any.required': '"quantity" is required',
    'number.min': '"quantity" must be greater than or equal to 1',
  });

const newProductSchema = Joi.string().required().min(5).messages({
  'any.required': '"name" is required',
  'string.min': '"name" length must be at least 5 characters long',
});

const newSaleSchema = Joi.array().items({
  productId: productIdSchema,
  quantity: quantitySchema,
});

module.exports = {
  newProductSchema,
  newSaleSchema,
};