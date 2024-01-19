const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services/index');
const { productsController } = require('../../../src/controllers/index');
const { allProductsReturn,
  filteredProductReturn,
  filteredProductNotFound,
  productsFromModel,
  filteredProductFromModel,
} = require('../mocks/products.mock');

describe('Testes para a camada Controllers - PRODUCTS CONTROLLERS', function () {
  it('Testa o retorno de todos os produtos corretamente - status 200', async function () {
    sinon.stub(productsService, 'allProducts').resolves(allProductsReturn);
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsController.getProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromModel);
  });
  
  it('Testa o retorno de produtos filtrados corretamente - status 200', async function () {
    sinon.stub(productsService, 'productById').resolves(filteredProductReturn);
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsController.getProductsById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(filteredProductFromModel);
  });

  it('Testa o retorno se filtrado um produto de id inexistente - status 200', async function () {
    sinon.stub(productsService, 'productById').resolves(filteredProductNotFound);
    const req = {
      params: { id: 5 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsController.getProductsById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});