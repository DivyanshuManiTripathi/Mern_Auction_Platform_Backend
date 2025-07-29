const app=require("./app")
const cloudinary=require("cloudinary")
cloudinary.v2.config({
    cloud_name:process.env.CLAUDINARY_CLOUD_NAME,
    api_key:process.env.CLAUDINARY_API_KEY,
    api_secret:process.env.CLAUDINARY_API_SECRET
})
app.listen(process.env.port,()=>{
    console.log(`Server is listening on port ${process.env.port}`);
})