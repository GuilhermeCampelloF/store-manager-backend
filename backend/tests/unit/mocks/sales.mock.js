const salesFromDb = [
  {
    saleId: 1,
    date: '2024-01-19T12:47:03.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2024-01-19T12:47:03.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2024-01-19T12:47:03.000Z',
    productId: 3,
    quantity: 15,
  },  
];

const filteredSale = [
  {
    date: '2024-01-19T12:47:03.000Z',
    productId: 3,
    quantity: 15,
  },
];

const allSalesReturn = {
  status: 'SUCCESSFUL',
  data: salesFromDb,
};

const filteredSaleReturn = {
  status: 'SUCCESSFUL',
  data: filteredSale,
};

const filteredSaleNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Sale not found' },
};

module.exports = {
  salesFromDb,
  filteredSale,
  allSalesReturn,
  filteredSaleReturn,
  filteredSaleNotFound,
};