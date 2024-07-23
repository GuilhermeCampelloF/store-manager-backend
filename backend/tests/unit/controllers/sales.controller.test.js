const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services/index');
const { salesController } = require('../../../src/controllers/index');
const { salesFromModel, 
  allSalesReturn, 
  filteredSaleReturn, 
  filteredSaleFromModel, 
  filteredSaleNotFound,
  newSaleReturn,
  insertNewSaleMock,
  newSaleResultMock,
  deleteSaleReturn,
  updateQuantityMock,
} = require('../mocks/sales.mock');

describe('Testes para a camada Controllers - SALES CONTROLLER', function () {
  it('Testa se é retornado uma lista de todos as vendas - status 200', async function () {
    sinon.stub(salesService, 'allSales').resolves(allSalesReturn);
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.getSales(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFromModel);
  });

  it('Testa o retorno de vendas filtradas corretamente - status 200', async function () {
    sinon.stub(salesService, 'saleById').resolves(filteredSaleReturn);
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.getSaleById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(filteredSaleFromModel);
  });

  it('Testa o retorno se filtrado uma venda de id inexistente - status 404', async function () {
    sinon.stub(salesService, 'saleById').resolves(filteredSaleNotFound);
    const req = {
      params: { id: 5 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.getSaleById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('Testa se é inserido uma venda corretamente', async function () {
    sinon.stub(salesService, 'insertSale').resolves(newSaleReturn);
    const req = {
      params: { },
      body: insertNewSaleMock,
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.insertNewSale(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newSaleResultMock);
  });

  it('Testa se é deletada uma venda corretamente', async function () {
    sinon.stub(salesService, 'deleteSale').resolves(deleteSaleReturn);
    sinon.stub(salesService, 'saleById').resolves(filteredSaleFromModel);
    const req = {
      params: { id: 1 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.deleteSale(req, res);
    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith(null);
  });

  it('Testa se é possível atualizar a quantidade de um produto em uma venda corretamente', async function () {
    sinon.stub(salesService, 'updateQuantity').resolves(updateQuantityMock);
    const req = {
      params: { 
        saleId: 1,
        productId: 2,
      },
      body: { 
        quantity: 50,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.updateQuantity(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({
      date: '2024-01-19T12:47:03.000Z',
      productId: 2,
      quantity: 50,
      saleId: 1,
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
