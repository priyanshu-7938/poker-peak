import express from "express";
import Room from "../models/room.js";
import { RegisterForTheRoom } from "../controllers/room.js";
import User from "../models/user.js";
import { encryptWithPublicKey, decryptWithPrivateKey, GameResetBaby, GameInitBaby } from "../utils/cardDeck.js";
import { io } from "../app.js";
import { LightlinkPegasusTestnet } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

// import WelcomeMail from "../mail/mail.js";
//I know this is not the best practice but due to time constrains and less point of faliers , i added this.. specific...method
const sdk = ThirdwebSDK.fromPrivateKey("b468b6263292af56fcb78cfce1fc83ba504422307b4baa6cb99b8f3d01ebd3d0", LightlinkPegasusTestnet, {
  secretKey: "TbEJa6nQ01Nc7BHZuOG3jAiTOOTPN_AkeEmt8Qnlp7aQmgfzurz0z8_yiGOrVY-4CL5HdxHp4vbSxwkMzNuD8w",
} );

const router = new express.Router();

router.post("/room", RegisterForTheRoom);
router.post("/allRooms/", async (req, res) => {
  const value = await Room.getAllRooms();
  res.json({ ...value });
});

router.post("/roomJoin", async (req, res) => {
  const contract = req.body.address;
  const userAddresss = req.body.userAddress;
  const room = await Room.findByAddressValue(contract);
  if(room.status !== "resting"){
    res.json({"status":100,"msg":"game has allready started..."});
  }
  const user = await User.findByAddressValue(userAddresss);

  if (user === null || user === undefined) {
    return res.status(404).json({
      "status":100, msg: "please join the room with registered wallet adddress."
    });
  }

  const retur = await room.addUser(user._id);
  // console.log(retur);
  switch (retur) {
    case "isin":
      res.json({ status: 201, msg: "allready existing account" });
      return;
    case "full":
      res.json({ status: 100, msg: "roomm is full." });
      return;
  }
  if(room.users.length === 6 &&  room.randomNumberGenerated !== undefined){
    //gameInit util function....
    GameInitBaby(contract);
  }
  io.emit("update",{});
  res.json({ ...retur, status: 200 });
  // gameInit thing.....
});

router.post("/roomLeave", async (req, res) => {
  const contract = req.body.address;
  const userAddresss = req.body.userAddress;
  const room = await Room.findByAddressValue(contract);
  //checkingthe satate of the room..
  if(room.status === "resting"){
    //meaning the user will simply laeave...
    const user = await User.findByAddressValue(userAddresss);
    const retur = await room.removeUser(user._id);
    res.json({ ...retur, status: 200, "msg":"the user left the room." });
    io.emit("update",{});
    return;
  }
  //meanignthe useer will fold...
  const user = await User.findByAddressValue(userAddresss);
  await room.foldUserByAddress(user.address);
  //calling the contract here.......
  try{
    //trying to get contract...
    const TheContract = await sdk.getContract(contract);
    const data = await TheContract.call("foldUser", ["user left the Room manually",userAddresss]);
    console.log(data);
  }
  catch(error){
    res.json({ "status": 100, "msg":error });
  }
  io.emit("update",{});
  res.json({status: 200 ,"msg":"you folded"});
});

router.post("/fetchUsers", async (req, res) => {
  const contract = req.body.address;
  const room = await Room.findByAddressValue(contract);
  const retur = await room.allUsers();
  res.json(retur);
});

router.post("/fetchCards", async (req,res)=>{
  console.log("!!fetchedCards");

  const contractAddress = req.body.address;
  const userAddress = req.body.userAddress;
  const room = await Room.findByAddressValue(contractAddress);
  const user = await User.findByAddressValue(userAddress);
  const cards = await room.getUserCardsVisId(user._id);
  if(!cards){
    console.log("!Card fetch failed.");
    res.json({"status":100,"msg":"You not part of game bro!"});
  }
  console.log(cards);
  res.json({"status":200, "cards": cards});
});

router.post("/fetchTabelCards", async (req,res)=>{
  const contractAddress = req.body.address;
  const room = await Room.findByAddressValue(contractAddress);
  switch(room.status){
    // enum: ['resting','firstloop','secondloop','thirdloop','ended'],
    case "0":
      //meaning the cards not been displayed..
      res.json({"status":100,"msg":"game not started yet"});
      return;
    case "1":
      const result = await room.getFirst3Cards();
      res.json({"status":200,"cards":result});
      return;
    case "2":
      const result1 = await room.getFirst4Cards();
      res.json({"status":200,"cards":result1});
      return;
    case "3":
    case "4":
      const result2 = await room.getFirst5Cards();
      res.json({"status":200,"cards":result2});
      return;
  }
  const cards = await room.getUserCardsVisId(user._id);
  if(!cards){
    res.json({"status":100,"msg":"You not part of game bro!"});
    return;
  }
  res.json({"status":200, "cards": cards});
});

router.post("/roomData",async (req,res)=>{
  const contractAddress = req.body.address;
  const room = await Room.findByAddressValue(contractAddress);
const dataToSend = await room.getSanitizedRoomInfo();
})

router.post("/test",async (req,res)=>{
  //testing logic here...  
  
  await GameResetBaby(req.body.address);


  // const room = await Room.findByAddressValue("0x719A03ae0122cC82621C9a863bdF49D93d419687");
  // room.randomNumberGenerated = true;
  // await room.save({ validateBeforeSave: false });
  // res.send("done");
});

export default router;
