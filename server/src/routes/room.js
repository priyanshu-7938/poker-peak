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

// import WelcomeMail from "../mail/mail.js";
//I know this is not the best practice but due to time constrains and less point of faliers , i added this.. specific...method
const sdk = ThirdwebSDK.fromPrivateKey(
  "b468b6263292af56fcb78cfce1fc83ba504422307b4baa6cb99b8f3d01ebd3d0",
  LightlinkPegasusTestnet,
  {
    secretKey:
      "TbEJa6nQ01Nc7BHZuOG3jAiTOOTPN_AkeEmt8Qnlp7aQmgfzurz0z8_yiGOrVY-4CL5HdxHp4vbSxwkMzNuD8w",
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
  await GenrateSopnecerWallet("0x328b02c1641D3700b6B456e098987A55F93c7064");
  res.end();
  //testing logic here...
  // await GameResetBaby(req.body.address);
  // const room = await Room.findByAddressValue("0x719A03ae0122cC82621C9a863bdF49D93d419687");
  // room.randomNumberGenerated = true;
  // await room.save({ validateBeforeSave: false });
  // res.send("done");
});

export default router;
