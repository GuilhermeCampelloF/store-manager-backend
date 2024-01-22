const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models/index');
const { salesFromDb, filteredSaleFromDB, filteredSaleFromModel, insertNewSaleMock, newSaleResultMock } = require('../mocks/sales.mock');

describe('Testes para a camada Models - SALES MODELS', function () {
  it('Testa se é retornado uma lista de todos as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDb]);
    const sales = await salesModel.getAllSales();
    expect(sales).to.be.an('array');
    expect(sales).to.deep.equal(salesFromDb);
  });
  // POSSÍVEL FALSO POSITIVO
  it('Testa se é retornado uma venda filtrada corretamente pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([filteredSaleFromDB]);
    const inputData = 2;
    const sale = await salesModel.getSaleById(inputData);
    expect(sale).to.be.an('array');
    expect(sale).to.deep.equal(filteredSaleFromModel);
  });

  it('Testa se é possível cadastrar uma venda corretamente', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    const sale = await salesModel.insertSales(insertNewSaleMock);
    expect(sale).to.be.an('object');
    expect(sale).to.deep.equal(newSaleResultMock);
  });

  afterEach(function () {
    sinon.restore();
  });
});
