const sinon = require('sinon');
const { expect } = require('chai');
const { productsModel } = require('../../../src/models/index');
const { productsService } = require('../../../src/services/index');
const { productsFromModel,
  filteredProductFromModel,
  productsFromDb,
  filteredProductFromDb,
} = require('../mocks/products.mock');

describe('Testes para a camada Services - PRODUCTS SERVICES', function () {
  it('Testa o retorno de todos os produtos corretamente', async function () {
    sinon.stub(productsModel, 'getAllProducts').resolves(productsFromDb);
    const { status, data } = await productsService.allProducts();
    expect(status).to.equal('SUCCESSFUL');
    expect(data).to.deep.equal(productsFromModel);
  });

  it('Testa o retorno do produto filtrado corretamente pelo id', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(filteredProductFromDb);
    const inputData = 1;
    const { status, data } = await productsService.productById(inputData);
    expect(status).to.equal('SUCCESSFUL');
    expect(data).to.deep.equal(filteredProductFromModel);
  });

  it('Testa se não é possível filtrar um produto que não existe', async function () {
    const inputData = 5;
    const { status, data } = await productsService.productById(inputData);
    expect(status).to.equal('NOT_FOUND');
    expect(data).to.deep.equal({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});
