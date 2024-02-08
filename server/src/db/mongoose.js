import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({});
const connectDB = async () => {
  //   console.log("evn ; ", process.env);
  try {
    const connectionInstance = await mongoose.connect(
      "mongodb://127.0.0.1:27017/",
      { dbName: "liteflow" }
    );
    console.log(
      `\nMONGODB connected !! DB NAME: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB error occured: ", error);
    process.exit(1);
  }
};

export default connectDB;
