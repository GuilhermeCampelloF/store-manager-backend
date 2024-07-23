const sinon = require('sinon');
const { expect } = require('chai');
const { salesModel } = require('../../../src/models/index');
const { salesService } = require('../../../src/services/index');
const { salesFromDb,
  filteredSaleFromDB,
  filteredSaleFromModel,
  newSaleResultMock,
  insertNewSaleMock,
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

  it('Testa se é possível cadastrar uma nova venda', async function () {
    sinon.stub(salesModel, 'insertSales').resolves(newSaleResultMock);
    sinon.stub(salesModel, 'getSaleById').resolves([{}]);
    const { status, data } = await salesService.insertSale(insertNewSaleMock);
    expect(status).to.equal('CREATED');
    expect(data).to.deep.equal(newSaleResultMock);
  });

  it('Testa se não é possível cadastrar uma venda sem informar o productId', async function () {
    sinon.stub(salesModel, 'insertSales').resolves();
    sinon.stub(salesModel, 'getSaleById').resolves();
    const { status, data } = await salesService.insertSale([{ quantity: 2 }]);
    expect(status).to.equal('BAD_REQUEST');
    expect(data).to.deep.equal({ message: '"productId" is required' });
  });

  it('Testa se não é possível cadastrar uma venda com o productId inexistente', async function () {
    sinon.stub(salesModel, 'insertSales').resolves();
    sinon.stub(salesModel, 'getSaleById').resolves();
    const { status, data } = await salesService.insertSale([{ 
      productId: 999,
      quantity: 2 }]);
    expect(status).to.equal('NOT_FOUND');
    expect(data).to.deep.equal({ message: 'Product not found' });
  });

  it('Testa se não é possível cadastrar uma venda sem informar uma quantity', async function () {
    sinon.stub(salesModel, 'insertSales').resolves();
    sinon.stub(salesModel, 'getSaleById').resolves();
    const { status, data } = await salesService.insertSale([{ productId: 1 }]);
    expect(status).to.equal('BAD_REQUEST');
    expect(data).to.deep.equal({ message: '"quantity" is required' });
  });

  it('Testa se não é possível cadastrar uma venda com quantity igual a 0', async function () {
    sinon.stub(salesModel, 'insertSales').resolves();
    const { status, data } = await salesService.insertSale([{ 
      productId: 1,
      quantity: 0 }]);
    expect(status).to.equal('INVALID_VALUE');
    expect(data).to.deep.equal({ message: '"quantity" must be greater than or equal to 1' });
  });

  it('Testa se é possível deletar uma venda', async function () {
    sinon.stub(salesModel, 'deleteSale').resolves(null);
    const inputData = 1;
    const { status, data } = await salesService.deleteSale(inputData);
    expect(status).to.equal('NO_CONTENT');
    expect(data).to.deep.equal(null);
  });

  it('Testa se não é possível deletar uma venda com id inexistente', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves([]);
    sinon.stub(salesModel, 'deleteSale').resolves();
    const inputData = 999;
    const { status, data } = await salesService.deleteSale(inputData);
    expect(status).to.equal('NOT_FOUND');
    expect(data).to.deep.equal({ message: 'Sale not found' });
  });

  it('Testa se é possível atualizar a quantidade de um produto em uma venda', async function () {
    sinon.stub(salesModel, 'updateQuantity').resolves({
      date: '2024-07-22T19:03:49.000Z',
      productId: 2,
      quantity: 50,
      saleId: 1,
    });
    const productId = 2;
    const saleId = 1;
    const quantity = 50;
    const { status, data } = await salesService.updateQuantity(saleId, productId, quantity);
    expect(status).to.equal('SUCCESSFUL');
    expect(data).to.be.deep.equal({
      date: '2024-07-22T19:03:49.000Z',
      productId: 2,
      quantity: 50,
      saleId: 1,
    });
  });

  it('Testa se não é possível atualizar a quantidade de um produto em uma venda quando não informado uma quantity', async function () {
    sinon.stub(salesModel, 'updateQuantity').resolves();
    const productId = 2;
    const saleId = 1;
    const { status, data } = await salesService.updateQuantity(saleId, productId);
    expect(status).to.equal('BAD_REQUEST');
    expect(data).to.be.deep.equal({ message: '"quantity" is required' });
  });

  it('Testa se não é possível atualizar a quantidade de um produto em uma venda quando informado um productId inválido', async function () {
    sinon.stub(salesModel, 'updateQuantity').resolves();
    const saleId = 1;
    const productId = 999;
    const quantity = 50;
    const { status, data } = await salesService.updateQuantity(saleId, productId, quantity);
    expect(status).to.equal('NOT_FOUND');
    expect(data).to.be.deep.equal({ message: 'Product not found in sale' });
  });

  afterEach(function () {
    sinon.restore();
  });
});
