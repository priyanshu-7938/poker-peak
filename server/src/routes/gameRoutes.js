import Router from "express";
import { isLoggedin } from "../middleware/gameMiddelware.js";


const routingToGame = Router();

routingToGame.use(isLoggedin);
// routingToGame.use("/:id",SpecificRoom);
routingToGame.use("/",(req,res)=>{
    res.json({status : "success"});
});


export { routingToGame };