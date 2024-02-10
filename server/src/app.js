import express from "express";
import userRoute from "./routes/user.js";
import roomRoute from "./routes/room.js";
import connectDB from "./db/mongoose.js";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { LightlinkPegasusTestnet } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { betRaised, UserFoldedWithReason, betCalled, deckPost, pKeyExposed, StateDiscloser, WithdrawalRequested, RandomNumberGenerated }  from "./HandelContractEmits/index.js";
import Room from "./models/room.js";
dotenv.config();

const THECONTRACTBABY = "0xFaBF45b94110514798bC5a803CA28b2042598C2e";

const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(userRoute);
app.use(roomRoute);



const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const roomMessages = new Map();

io.on("connection", (socket) => {
  console.log(`User Connected :${socket.id}`);
  socket.on("joinRoom", ({ roomName, txn }) => {
    console.log("roomName , ", roomName);
    if (!roomMessages.has(roomName)) {
      roomMessages.set(roomName, []);
    }
    socket.join(roomName);
  });

  socket.on("leaveRoom", ({ roomName }) => {
    socket.leave(roomName);
    socket.emit("message", { event: "You have left the room." });
    socket.broadcast
      .to(roomName)
      .emit("message", { event: `${socket.id} has left the room.` });
  });

  socket.on("sendMessage", ({ roomName, message }) => {
    // Store the message in the array associated with the room
    roomMessages.get(roomName).push({ user: socket.id, message });
    // Emit the message to all users in the room
    io.to(roomName).emit("message", { user: socket.id, message });
    console.log("rooms : ", roomMessages);
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});


const sdk = new ThirdwebSDK(LightlinkPegasusTestnet, {
      secretKey: "6stWsoOg6ve-2lHtDD4C2tV0N2XD96R-YnKKaGePgMRo-lWH6aKMJc2HUHSGSskRLEJDGsKFM5MH0EkerG359g",
    } );
    
const ABI = await Room.getABIbyAddressValue(THECONTRACTBABY);
    
const contract = await sdk.getContract(THECONTRACTBABY,ABI);
 
//event for contract...
contract.events.addEventListener("UserFoldedWithReason", (event) => UserFoldedWithReason(event,io));
contract.events.addEventListener("betRaised", (event) => betRaised(event,io));
contract.events.addEventListener("betCalled", (event) => betCalled(event,io));
contract.events.addEventListener("deckPost", (event) => deckPost(event,io));
contract.events.addEventListener("pKeyExposed", (event) => pKeyExposed(event,io));
contract.events.addEventListener("StateDiscloser", (event) => StateDiscloser(event,io));
contract.events.addEventListener("RandomNumberGenerated", (event) => RandomNumberGenerated(event,io));
contract.events.addEventListener("WithdrawalRequested", (event) => WithdrawalRequested(event,io));


// const contract2 = await sdk.getContract("0x98a1fc6974Fa4F278B4C9973fE08d9e4eF375DEc");
// contract2.events.addEventListener("eventName",(event)=>testingEvent(event,io));

// const testingEvent = (event,io) => {
//   console.log("this text is important to show up...");
//   io.emit("testingEvent",{
//     "msg":"Status was updated",
//     ...event
// });
// }

export { httpServer, io};