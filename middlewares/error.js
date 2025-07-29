class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // Log the error for debugging purposes
    console.error(err);
    if(err.name === "jsonWebTokenError"){
       const message="Json Web Token is invalid, please login again."
       err=new ErrorHandler(message,400);
    }
     if(err.name === "TokenExpiredError"){
       const message="Json Web Token is expired,try again."
       err=new ErrorHandler(message,400);
    }
     if(err.name === "CastError"){
       const message=`Invalid ${err.path}`
       err=new ErrorHandler(message,400);
    }
    // saare error ko corresponding error message se map kiye
    const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
    : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
}

module.exports = { ErrorHandler, errorMiddleware };