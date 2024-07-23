const dateTest = '2024-01-19T12:47:03.000Z';

const salesFromDb = [
  {
    saleId: 1,
    date: dateTest,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: dateTest,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: dateTest,
    productId: 3,
    quantity: 15,
  },  
];

const salesFromModel = [
  {
    saleId: 1,
    date: dateTest,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: dateTest,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: dateTest,
    productId: 3,
    quantity: 15,
  },  
];

const filteredSaleFromDB = [
  {
    date: dateTest,
    productId: 3,
    quantity: 15,
  },
];

const filteredSaleFromModel = [
  {
    date: dateTest,
    productId: 3,
    quantity: 15,
  },
];

const insertNewSaleMock = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const newSaleResultMock = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const updateQuantityMock = {
  status: 'SUCCESSFUL',
  data: {
    date: dateTest,
    productId: 2,
    quantity: 50,
    saleId: 1,
  },
};

const allSalesReturn = {
  status: 'SUCCESSFUL',
  data: salesFromDb,
};

const filteredSaleReturn = {
  status: 'SUCCESSFUL',
  data: filteredSaleFromModel,
};

const filteredSaleNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Sale not found' },
};

const newSaleReturn = {
  status: 'CREATED',
  data: newSaleResultMock,
};

const deleteSaleReturn = {
  status: 'NO_CONTENT',
  data: null,
};

module.exports = {
  salesFromDb,
  salesFromModel,
  filteredSaleFromDB,
  filteredSaleFromModel,
  allSalesReturn,
  filteredSaleReturn,
  filteredSaleNotFound,
  insertNewSaleMock,
  newSaleResultMock,
  newSaleReturn,
  deleteSaleReturn,
  updateQuantityMock,
};