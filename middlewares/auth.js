const {User} = require("../models/userModel");
const {ErrorHandler} = require("../middlewares/error");
const jwt=require("jsonwebtoken");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
       const token = req.cookies.token;
       if (!token) {
           return next(new ErrorHandler("User not authicated", 401));
       }
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.user = await User.findById(decoded.id);
        next();
});

const  isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to access this resouce.`,
          403
        )
      );
    }
    next();
  };
};
module.exports = {isAuthenticated,isAuthorized};

