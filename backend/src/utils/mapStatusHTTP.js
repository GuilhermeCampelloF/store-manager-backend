const httpErrorMap = {
  SUCCESSFUL: 200,
  NOT_FOUND: 404,
  CREATED: 201,
};

const mapStatusHTTP = (status) => httpErrorMap[status] || 500;
  
module.exports = mapStatusHTTP;