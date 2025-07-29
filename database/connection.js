const mongoose=require("mongoose");
const connection=() => {
   mongoose.connect(process.env.MONGO_URI, {
    dbName: "MERN_AUCTION_PLATFORM",
    }).then(() => {
    console.log("MongoDB connected successfully");
     }).catch((err) => {
    console.error("MongoDB connection error:", err);
});
}
module.exports = { connection };