import express from "express";
import Room from "../models/room.js";
import {
  RegisterForTheRoom,
  allRooms,
  fetchCards,
  fetchTabelCards,
  fetchUsers,
  roomData,
  roomJoin,
  roomLeave,
} from "../controllers/room.js";
import User from "../models/user.js";
import {
  encryptWithPublicKey,
  decryptWithPrivateKey,
  GameResetBaby,
  GameInitBaby,
} from "../utils/cardDeck.js";
import { io } from "../app.js";
import { LightlinkPegasusTestnet } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import dotenv from "dotenv";
dotenv.config();

// import WelcomeMail from "../mail/mail.js";
//I know this is not the best practice but due to time constrains and less point of faliers , i added this.. specific...method
const THECONTRACTBABY = "0xFaBF45b94110514798bC5a803CA28b2042598C2e";

const sdk = ThirdwebSDK.fromPrivateKey(
  process.env.PRIVATE_SERVER_KEY,
  LightlinkPegasusTestnet,
  {
    secretKey:
      "6stWsoOg6ve-2lHtDD4C2tV0N2XD96R-YnKKaGePgMRo-lWH6aKMJc2HUHSGSskRLEJDGsKFM5MH0EkerG359g",
  }
);

const router = new express.Router();

router.post("/room", RegisterForTheRoom);
router.post("/allRooms/", allRooms);

router.post("/roomJoin", roomJoin);

router.post("/roomLeave", roomLeave);

router.post("/fetchUsers", fetchUsers);

router.post("/fetchCards", fetchCards);

router.post("/fetchTabelCards", fetchTabelCards);

router.post("/roomData", roomData);

router.post("/test", async (req, res) => {

  const contractAddress = req.body.address;

  // const TheRoom = await Room.findByAddressValue(contractAddress);
  // TheRoom.flushData();
  
  
  //dont know what happened here...

  // const room = await Room.findByAddressValue(contractAddress);
  // const contract = await sdk.getContract(contractAddress);
  // const _sponsorWallet = room.sponcerAddress;
  // await contract.call("GenerateRandomNumber", [_sponsorWallet]);
  // console.log("!!Game Important: The request for new random number if initiated.!");
  // res.send("wallaha");

  await GameResetBaby(contractAddress);
  res.send("Helo:");


  
  // await GenrateSopnecerWallet(THECONTRACTBABY);
  // res.end();
  //testing logic here...
  // await GameResetBaby(req.body.address);
  // const room = await Room.findByAddressValue("0x719A03ae0122cC82621C9a863bdF49D93d419687");
  // room.randomNumberGenerated = true;
  // await room.save({ validateBeforeSave: false });
  // res.send("done");
});

export default router;
