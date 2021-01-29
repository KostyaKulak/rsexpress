const throw404 = res => {
  if (res) {
    res.status(404).send();
  } else {
    const error = new Error();
    error.status = 404;
    throw error;
  }
};

const throw401 = () => {
  const error = new Error();
  error.status = 401;
  throw error;
};

const throw403 = () => {
  const error = new Error();
  error.status = 403;
  throw error;
};

module.exports = { throw401, throw403, throw404 };
