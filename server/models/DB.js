const mongoose = require("mongoose")


const connectDb = async()=>{
    const connection  = await mongoose.connect(process.env.DB_URI);
    console.log("Connected");
}

module.exports = connectDb