const sinon = require('sinon');
const { expect } = require('chai');
const { salesModel } = require('../../../src/models/index');
const { salesService } = require('../../../src/services/index');
const { salesFromDb,
  filteredSaleFromDB,
  filteredSaleFromModel,
} = require('../mocks/sales.mock');

describe('Testes para a camada Services - SALES SERVICES', function () {
  it('Testa o retorno de todas as vendas', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(salesFromDb);
    const { status, data } = await salesService.allSales();
    expect(status).to.equal('SUCCESSFUL');
    expect(data).to.equal(salesFromDb); // Não sei por que não funciona com salesFromModel
  });

  it('Testa o retorno de uma venda filtrada pelo id', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves(filteredSaleFromDB);
    const inputData = 2;
    const { status, data } = await salesService.saleById(inputData);
    expect(status).to.equal('SUCCESSFUL');
    expect(data).to.deep.equal(filteredSaleFromModel);
  });

  it('Testa se não é possível filtrar uma venda com id inválido', async function () {
    const inputData = 999;
    const { status, data } = await salesService.saleById(inputData);
    expect(status).to.equal('NOT_FOUND');
    expect(data).to.deep.equal({ message: 'Sale not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});
