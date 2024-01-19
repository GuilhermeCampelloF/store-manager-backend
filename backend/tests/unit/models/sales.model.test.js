const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models/index');
const { salesFromDb } = require('../mocks/sales.mock');

describe('Testes para a camada Models - SALES MODELS', function () {
  it('Testa se é retornado uma lista de todos as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDb]);
    const sales = await salesModel.getAllSales();
    expect(sales).to.be.an('array');
    expect(sales).to.deep.equal(salesFromDb);
  });
  afterEach(function () {
    sinon.restore();
  });
});

// FALSO POSITIVO
// it('Testa se é retornado uma venda filtrada corretamente pelo id', async function () {
//     sinon.stub(connection, 'execute').resolves([filteredSale]);
//     const inputData = 1;
//     const sale = await salesModel.getSaleById(inputData);
//     expect(sale).to.be.an('array');
//     expect(sale).to.deep.equal(filteredSale);
//   });