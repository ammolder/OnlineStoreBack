function tryCatchWrapper(enpointFn) {
  return async (req, res, next) => {
    try {
      await enpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

function HttpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

const handleMongooseError = (error, data, next) => {
  const { name, code } = error;

  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  error.status = status;
  next();
};

module.exports = handleMongooseError;

module.exports = { tryCatchWrapper, HttpError, handleMongooseError };
