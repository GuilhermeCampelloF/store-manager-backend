const sinon = require('sinon');
const { expect } = require('chai');
const { productsModel } = require('../../../src/models/index');
const { productsService } = require('../../../src/services/index');
const { productsFromModel,
  filteredProductFromModel,
  productsFromDb,
  filteredProductFromDb,
  // newProductIdFromModel,
  // newProductMock,
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

  // it('Testa se é possível cadastrar um novo produto', async function () {
  //   sinon.stub(productsModel, 'insertProducts').resolves(newProductIdFromModel);
  //   sinon.stub(productsModel, 'getProductById').resolves(newProductMock);
  //   const inputData = 'New product';
  //   const { status, data } = await productsService.insertProducts(inputData);
  //   expect(status).to.equal('CREATED');
  //   expect(data).to.deep.equal(newProductMock);
  // });

  afterEach(function () {
    sinon.restore();
  });
});
