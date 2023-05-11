const correctReturn = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
};

const errorResponse = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  CONFLICT: 409,
};

const errorMapper = (type) => errorResponse[type] || 500;

module.exports = {
  correctReturn,
  errorResponse,
  errorMapper,
};