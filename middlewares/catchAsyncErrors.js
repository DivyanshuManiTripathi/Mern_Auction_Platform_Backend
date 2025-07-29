 const catchAsyncErrors = (theFunction) => {
  return (req, res, next) => {
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};
// This middleware is used to catch errors in async functions and pass them to the error handling middleware
module.exports = catchAsyncErrors;
