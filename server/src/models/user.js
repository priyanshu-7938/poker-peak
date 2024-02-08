import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"]
    },
    address: {
      type: String,
      required: [true, "must have a name"],
      trim: true,
      unique: true
    },
    token: {
      type: String,
      required: [true, "must have a name"]
    },
    email: {
      type: String,
      unique: true,
      required: [true, "must have a email"],
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Enter valid email");
        }
      }
    },
    password: {
      type: String,
      required: [true, "must have a name"],
      trim: true,
      validate(value) {
        if (value.length < 7) {
          throw new Error("Password should be greater than 6 digit");
        }
      }
    },
    pooledMoney: {
      type: String,
      default: "0"
    },
    avatar: {
      type: String,
      default: "https://avataaars.io/"
    },
    admin: {
      type: Boolean,
      default: false
    },
    verified: {
      type: Boolean,
      default: false
    },
    kyc: {
      type: Boolean,
      default: false
    },
    otp: {
      type: String,
      default: ""
    },
    phoneNo: {
      type: String
    },
    phrase: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const tok = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.token = tok;
  await user.save({ validataBeforeSave: false });
  return tok;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.token;
  delete userObject.pooledMoney;
  delete userObject.address;
  delete userObject.phrase;
  return userObject;
};

userSchema.statics.findByAddress = async (address, password) => {
  try {
    const user = await User.findOne({ address });
    if (!user) {
      throw new Error("Unable to Login");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Unable to Login");
    }
    return user;
  } catch (err) {
    return;
  }
};

userSchema.statics.findById = async (_id) => {
  try {
    const user = await User.findOne({ _id });
    if (!user) {
      throw new Error("Unable to Login");
    }
    return user;
  } catch (err) {
    console.log(err);
    return;
  }
};

userSchema.statics.findByAddressValue = async (address) => {
  try {
    const user = await User.findOne({ address });
    if (!user) {
      throw new Error("Unable to fetch user for the game room.");
    }
    return user;  
  } catch (err) {
    console.log(err);
    return;
  }
  
};

userSchema.statics.validateToken = async (token, _id) => {
  try {
    const user = await User.findOne({ _id });
    return token == user?.token;  
  } catch (err) {
    console.log(err);
    return;
  }
  
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
