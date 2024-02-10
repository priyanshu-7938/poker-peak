import User from "../models/user.js";
import { sendResponse, sendError } from "../middleware/sendResponce.js";

const handelSignupForUser = async (req, res) => {
  const user = new User(req.body);
  console.log(req.body);

  try {
    // await sendSignUpOtp(user);
    const token = await user.generateAuthToken();

    // console.log(user.toJSON());w
    sendResponse(res, 201, "signup successful", {
      user,
      token,
    });
  } catch (e) {
    // logger.info(`${e}`);
    console.log(e);
    sendError(res, 400, "Email Should be unique", `${e}`);
  }
};

const handelLoginForUser = async (req, res) => {
  const data = req.body;
  try {
    if (data?.password && data?.address) {
      let user = await User.findByAddress(data.address, data.password);

      if (!user || user === null) {
        console.log("User not found");
        return res.status(404).json({
          status: "unsuccesfull",
          message: "Login Failed",
        });
      }

      let token = await user.generateAuthToken();

      const loggedInUser = await User.findById(user._id);

      const obj = loggedInUser.toObject();
      delete obj.password;
      delete obj.otp;
      delete obj.address;
      const options = {
        httpOnly: true,
        secure: true,
      };
      return res
        .status(200)
        .cookie("accessToken", token, options)
        .json({
          status: "succesfull",
          data: {
            token,
            userInfo: obj,
          },
          message: "Succesfull LoggedIn",
        });
    }
  } catch (e) {
    console.log("sdfsdf");
    return e;
  }
};

const changeUsername = async (req, res, next) => {
  try {
    const { username, address, password } = req.body;
    const user = await User.findByAddress(address, password);
    user.name = username;
    await user.save({ validateBeforeSave: false });
    res.json({
      status: 200,
      message: "username changed succesfully",
    });
  } catch (error) {
    next(error);
  }
};
const changeEmail = async (req, res, next) => {
  try {
    const { email, address, password } = req.body;
    const user = await User.findByAddress(address, password);
    if (user.kyc) {
      throw new Error("KYC is already created , we can't change email");
    }
    user.email = email;
    await user.save();
    res.json({
      status: 200,
      message: "email updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
const changeAvataar = async (req, res, next) => {
  try {
    const { avataar, address, password } = req.body;
    const user = await User.findByAddress(address, password);
    user.avataar = avataar;
    await user.save();
    res.json({
      status: 200,
      message: "avataar changed successfully",
    });
  } catch (error) {
    next(error);
  }
};
const changePassword = async (req, res, next) => {
  try {
    const { newPassword, address, password } = req.body;
    const user = await User.findByAddress(address, password);
    user.password = newPassword;
    await user.save();
    res.json({
      status: 200,
      message: "password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};
export {
  handelLoginForUser,
  handelSignupForUser,
  changeUsername,
  changeEmail,
  changeAvataar,
  changePassword,
};
