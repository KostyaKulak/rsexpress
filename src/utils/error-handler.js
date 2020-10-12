const throw404 = () => {
  const error = new Error();
  error.status = 404;
  throw error;
};

const throw401 = () => {
  const error = new Error();
  error.status = 401;
  throw error;
};

module.exports = { throw401, throw404 };
