import User from "../models/user.js"
import { sendError } from "./sendResponce.js";


const isLoggedin = async (req,res,next) => {
    const body = req.body;
    const value = await User.validateToken(body.token, body.id);
    if(!value){
        sendError(res, 401, "the token is not valid");
        return;
    }
    next();

}

export { isLoggedin };