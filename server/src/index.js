import { httpServer } from "./app.js";
// import dotenv from "dotenv";

const port = 8000;
httpServer.listen(port, () => {
  console.log("Server started at:", port);
});
