import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({});
console.log(process.env.MONGO_URL);
const connectDB = async () => {
  //   console.log("evn ; ", process.env);
  try {
    const connectionInstance = await mongoose.connect(
      "mongodb://127.0.0.1:27017/liteflow",
    );
    console.log(
      `\nMONGODB connected !! DB NAME: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB error occured: ", error);
    process.exit(1);
  }
};


/*
  const mongoose = require("mongoose");

const url =
  "mongodb+srv://arnavgupta295:rDC3p7CnbOx2TTfO@cluster0.fig4bbo.mongodb.net/Food_Delivery?retryWrites=true&w=majority";

mongoose
  .connect(url, {
    connectTimeoutMS: 6000000, // Set connection timeout in milliseconds
  })
  .then(() => console.log("Connection successful"))
  .catch((err) => console.error("Connection failed:", err));
  module.exports = mongoose;
*/






export default connectDB;
