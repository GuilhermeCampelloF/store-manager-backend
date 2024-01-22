const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models/index');
const { productsFromDb,
  productsFromModel,
  filteredProductFromDb,
  filteredProductFromModel,
  newProductIdFromDb,
  newProductIdFromModel,
} = require('../mocks/products.mock');

describe('Testes para a camada Models - PRODUCTS MODELS', function () {
  it('Testa se é retornado uma lista de todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDb]);
    const products = await productsModel.getAllProducts();
    expect(products).to.be.an('array');
    expect(products).to.deep.equal(productsFromModel);
  });
  
  it('Testa se é retornado um produto filtrado corretamente pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([[filteredProductFromDb]]);
    const inputData = 1;
    const filteredProduct = await productsModel.getProductById(inputData);
    expect(filteredProduct).to.be.an('object');
    expect(filteredProduct).to.deep.equal(filteredProductFromModel);
  });

  it('Testa se é possível cadastrar um novo produto corretamente', async function () {
    sinon.stub(connection, 'execute').resolves([newProductIdFromDb]);
    const inputData = 'New product';
    const filteredProduct = await productsModel.insertProducts(inputData);
    expect(filteredProduct).to.be.a('number');
    expect(filteredProduct).to.deep.equal(newProductIdFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});