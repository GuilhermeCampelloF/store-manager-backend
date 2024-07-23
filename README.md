## STORE MANAGER

O Projeto Store Manager foi desenvolvido durante o curso de formação full-stack pela Trybe.

A aplicação consiste em uma API RESTful de um sistema de gerenciamento de vendas, no qual é possível criar, visualizar, deletar e atualizar produtos e vendas. A API utiliza arquitetura em camadas e um banco de dados MySQL para a gestão de dados, possuindo também testes para garantir as funcionalidade das implementações.

## REQUISITOS

- Node.js
- Docker/Docker Compose

<details>
<summary>🐳 Iniciando a aplicação no Docker Compose</summary>

```bash

# Após clonar o repositório:

# Instale as dependências
npm install

# Inicie os containers do compose `backend` e `db`
# A aplicação estará disponível em `http://localhost:3001` em modo de desenvolvimento
docker-compose up -d

# É possível ver os logs da aplicação com `docker logs -n 10 -f <nome-do-container>`
docker logs -n 10 -f store_manager
```

</details>

<details>
<summary>🖥️ Rodando testes</summary>

```bash
#### Comandos dos testes com mocha
npm run test:mocha     # roda os testes do mocha
npm run test:coverage  # roda os testes e mostra a cobertura geral
npm run test:mutation  # roda os testes e mostra a cobertura de mutações
```

</details>

<details>
<summary>🎲 Diagrama entidade-relacionamento</summary>

A modelagem do banco de dados respeita o seguinte diagrama de entidade-relacionamento:

![erStoreManager](https://github.com/user-attachments/assets/4b012efa-f6f2-46e6-82e7-9dd62fd149fb)

</details>

## 📖 HABILIDADES TRABALHADAS 📖

- Desenvolvimento de API RESTful;
- Interação com banco de dados MySQL;
- Validação de dados recebidos pela API;
- Criação de testes para garantir correta implementação dos endpoints;

## IMPLEMENTAÇÕES REALIZADAS

- É possível ver o desenvolvimento passo-a-passo dos tópicos abaixo através do histórico de commits da aplicação

<details>
<summary><strong>Endpoints para listar produtos</strong></summary>

- `GET /products`: retorna todos os produtos;
- `GET /products/:id`: retorna apenas o produto com o `id` presente na URL;
- O resultado da listagem é **ordenado** de forma crescente pelo campo `id`;

</details>

<details>
<summary><strong>Endpoints para listar vendas</strong></summary>

- `GET /sales`: retorna todas as vendas;
- `GET /sales/:id`: retorna apenas a venda o `id` presente na URL;
- O resultado da listagem é **ordenado** de forma crescente pelo campo `saleId`, em caso de empate, **ordena** também de forma crescente pelo campo `productId`;

</details>

<details>
<summary><strong>Endpoint para cadastrar produtos</strong></summary>

- `POST /products`: Os produtos enviados na requisição são salvos na tabela `products` do banco de dados;

</details>

<details>
<summary><strong>Validações para o cadastro de produtos</strong></summary>

- Mensagens de erro personalizadas utilizando JOI, para as requisições com dados inválidos;

</details>

<details>
<summary><strong>Endpoint para cadastrar vendas</strong></summary>

- `POST /sales`: As vendas enviadas na requisição são salvas nas tabelas `sales` e `sales_products` do banco de dados;

</details>

<details>
<summary><strong>Validações para o cadastro de vendas</strong></summary>

- Mensagens de erro personalizadas utilizando JOI, para as requisições com dados inválidos;

</details>

<details>
<summary><strong>Endpoint para atualizar um produto</strong></summary>

- `PUT /products/:id`: O produto com `id` presente na URL é atualizado;
- O corpo da requisição é validado igualmente como feito no cadastro;

</details>

<details>
<summary><strong>Endpoint para atualizar a quantidade de um produto em uma venda</strong></summary>

- `PUT /sales/:saleId/products/:productId/quantity`: A quantidade `quantity` do produto vendido com o `productId` presente na URL é atualizada;
- O corpo da requisição é validado;

</details>

<details>
<summary><strong>Endpoint para pesquisar um produto</strong></summary>

- `GET /products/search`: Traz todos os produtos no banco de dados contendo o valor da query `q` em `name`, se existirem;
- Retorna um array de produtos que contenham em seu nome o termo passado na URL;
- Retorna todos os produtos caso _query params_ `q` esteja vazia;
- Retorna um array vazio caso nenhum nome satisfaça a busca;

</details>

<details>
<summary><strong>Endpoint para deletar um produto</strong></summary>

- `DELETE /products/:id`: O produto com `id` presente na URL é deletado;

</details>

<details>
<summary><strong>Endpoint para deletar uma venda</strong></summary>

- `DELETE /sales/:id`: A venda com `id` presente na URL é deletada;

</details>

## ©️ DISCLAIMER

<div align="justify">
Com exceção das alterações destacadas acima no tópico "implementações realizadas", <b>TODOS OS DEMAIS ARQUIVOS</b> foram desenvolvidos e estão sob responsabilidade da TRYBE, incluindo, mas não se limitando ao: diagrama entidade-relacionamento do sistema, seeders, containers docker e organização dos demais diretórios da aplicação.
</div>
