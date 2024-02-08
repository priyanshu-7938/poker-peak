import express from "express";
import {
  changeAvataar,
  changePassword,
  changeUsername,
  handelLoginForUser,
  handelSignupForUser,
} from "../controllers/user.js";
// import WelcomeMail from "../mail/mail.js";
import { routingToGame } from "./gameRoutes.js";
import { creatingARoom } from "../controllers/room.js";
import User from "../models/user.js";

const router = new express.Router();

router.post("/signup", handelSignupForUser);

router.post("/login", handelLoginForUser);

router.post("/game", routingToGame);

router.post("/createroom", creatingARoom);
router.post("/changeUsername", changeUsername);
router.post("/changePassword", changePassword);
router.post("/changeAvataar", changeAvataar);

router.post("/userData", async (req, res) => {
  try {
    const user = await User.findByAddressValue(req.body.address);
    return res.json(user.toJSON());
  } catch (e) {
    res.status(400).json({
      message: "error while fetching user's info",
    });
  }
});

export default router;
