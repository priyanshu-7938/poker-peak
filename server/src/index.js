import { httpServer } from "./app.js";
// import dotenv from "dotenv";

const port = process.env.PORT ;
httpServer.listen(port,()=>{console.log("Server started at:",port)});