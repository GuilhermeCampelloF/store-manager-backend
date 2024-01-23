const productsFromDb = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const productsFromModel = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const filteredProductFromDb = {
  id: 1,
  name: 'Martelo de Thor',
};

const filteredProductFromModel = {
  id: 1,
  name: 'Martelo de Thor',
};

const allProductsReturn = {
  status: 'SUCCESSFUL',
  data: productsFromModel,
};

const filteredProductReturn = {
  status: 'SUCCESSFUL',
  data: filteredProductFromModel,
};

const filteredProductNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

const newProductIdFromDb = { 
  insertId: 4,
};

const newProductIdFromModel = 4;

const newProductMock = {
  id: 4,
  name: 'New product',
};

const newProductReturn = {
  status: 'CREATED',
  data: newProductMock,
};

const updatedProductFromDb = {
  id: 2,
  name: 'Updated product',
};

const updatedProductFromModel = {
  id: 2,
  name: 'Updated product',
};

const deleteProductReturn = {
  status: 'NO_CONTENT',
  data: null,
};

module.exports = {
  productsFromDb,
  productsFromModel,
  filteredProductFromDb,
  filteredProductFromModel,
  allProductsReturn,
  filteredProductReturn,
  filteredProductNotFound,
  newProductIdFromDb,
  newProductIdFromModel,
  newProductMock,
  updatedProductFromDb,
  updatedProductFromModel,
  newProductReturn,
  deleteProductReturn,
};