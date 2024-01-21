const httpErrorMap = {
  SUCCESSFUL: 200,
  NOT_FOUND: 404,
  CREATED: 201,
  INVALID_VALUE: 422,
  BAD_REQUEST: 400,
};

const mapStatusHTTP = (status) => httpErrorMap[status] || 500;
  
module.exports = mapStatusHTTP;