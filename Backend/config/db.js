const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {});
        console.log("mongoose connected");

    } catch (error){
     console.log("error in  connecting Database",error);
     process.exit(1);
    }
};

module.exports = connectDB;
