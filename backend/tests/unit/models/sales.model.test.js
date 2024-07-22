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

  it('Testa se é retornado uma mensagem de erro caso id seja inválido', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const inputData = 999;
    const sale = await salesModel.getSaleById(inputData);
    expect(sale).to.be.an('array');
    expect(sale).to.deep.equal([]);
  });

  it('Testa se é possível deletar uma venda', async function () {
    const mockExecute = sinon.stub(connection, 'execute').resolves(undefined);
    await salesModel.deleteSale(1);
    sinon.assert.calledOnce(mockExecute);
  });

  // it('Testa se não é possível deletar venda com id inexistente', async function () {
  //   sinon.stub(salesModel, 'deleteSale').resolves([]);
  // });

  it('Testa se é possível atualizar a quantidade de um produto em uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([[{
      date: '2024-07-22T19:03:49.000Z',
      productId: 1,
      quantity: 5,
      saleId: 1,
    }]]);
    const productId = 1;
    const saleId = 1;
    const quantity = 5;

    const updatedSale = await salesModel.updateQuantity(saleId, productId, quantity);
    expect(updatedSale).to.be.a('object');
    expect(updatedSale).to.be.deep.equal({
      date: '2024-07-22T19:03:49.000Z',
      productId: 1,
      quantity: 5,
      saleId: 1,
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
