
import Room from "../models/room.js"
import User from "../models/user.js"
import { sendResponse,sendError } from "../middleware/sendResponce.js";

const creatingARoom = async (req,res)=>{
    const room = new Room(req.body);
    await room.save({validataBeforeSave:false});
    console.log(room);
    res.send("success");
}

const RegisterForTheRoom = async (req,res)=>{
    const roomAddress = req.body.id;
    const _id = req.body?.userId;
    const token = req.body?.token;
    const txn = req.body?.txn;

    const bol = User.validateToken( token, _id);

    if(!bol){
        res.json({"status":"unauthorised"});
    }
    // console.log(req.body.id);
    const room = await Room.findByAddressValue(roomAddress);
    if(!room){
        //meaning there is an error...
        req.json({"status":"the room not found..."});
    }
    res.send("helo"); 
}


export { creatingARoom,
    RegisterForTheRoom
};