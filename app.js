const { config } = require("dotenv");
const express=require("express");
const cors=require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const { connection } = require("./database/connection");
const { errorMiddleware } = require("./middlewares/error");
const userRouter=require("./router/userRoutes");
const auctionItemRouter = require("./router/auctionItemRoutes");
const app=express();
app.use(cors(
    {
        origin:process.env.FRONTEND_URL,
        methods:["GET","POST","PUT","DELETE"], // Frontend se ye 4 methods access kr skte hain
        credentials:true,
    }
));
config({
        path:"./config/config.env",
    });
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true})); // For parsing application/x-www-form-urlencoded
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}
)); // For parsing multipart/form-data, alternatively multer bhi use kr skte hain

app.use("/api/v1/user", userRouter); // User routes
app.use("/api/v1/auctionitem", auctionItemRouter); // auction item routes
// connecting to the database
connection();
// Error handling middleware
app.use(errorMiddleware); 
module.exports=app;