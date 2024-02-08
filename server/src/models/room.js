import mongoose from "mongoose";
import crypto from "crypto";
import User from "./user.js";
import {
  getARandomDeck,
  decryptWithPrivateKey,
  encryptWithPublicKey,
  GenrateSopnecerWallet
} from "../utils/cardDeck.js";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const roomSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["resting", "firstloop", "secondloop", "thirdloop", "ended"],
      default: "resting"
    },
    users: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        isFolded: {
          type: Boolean,
          default: false
        }
      }
    ],
    pooledAmount: {
      type: Number,
      default: 0
    },
    publicKey: {
      type: String
    },
    privateKey: {
      type: String
    },
    encryptedGameDeck: {
      type: [String]
    },
    encryptedDeck: {
      type: [String]
    },
    randomNumberGenerated: {
      type: Boolean
    },
    memberCount: {
      type: Number,
      default: 0
    },
    contrctAddress: {
      type: String,
      unique: true,
      required: [true, "must have a contract Address"]
    },
    sponcerAddress: {
      type: String,
      unique: true
    },
  },
  {
    timestamps: true
  }
);

// instance method to encode the cards with the public key
roomSchema.methods.getFirst3Cards = function () {
  if (
    this.status == "firstloop" ||
    this.status == "secondloop" ||
    this.stauts == "thirdloop"
  ) {
    return this.encryptedGameDeck
      .map((item) => decryptWithPrivateKey(item, this.privateKey))
      .slice(-5)
      .slice(0, 3);
  }
};

roomSchema.statics.findByAddressValue = async (contrctAddress) => {
  const room = await Room.findOne({ contrctAddress });
  if (!room) {
    return undefined;
  }
  return room;
};

roomSchema.statics.getAllRooms = async function () {
  const rooms = await this.find();
  const sanitizedRooms = rooms.map((room) => room.getSanitizedRoomInfo());
  return sanitizedRooms;
};

roomSchema.methods.getSanitizedRoomInfo = function () {
  const sanitizedRoom = {
    _id: this._id,
    status: this.status,
    users: this.users.map((user) => ({ id: user.id, isFolded: user.isFolded })),
    pooledAmount: this.pooledAmount,
    encryptedGameDeck: this.encryptedGameDeck,
    memberCount: this.memberCount,
    contrctAddress: this.contrctAddress,
    sponcerAddress: this.sponcerAddress,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };

  return sanitizedRoom;
};

roomSchema.methods.allUsers = async function () {
  const room = this;
  const users = room.users;
  let userData = [];
  //get name address avatar
  for (const i in users) {
    const val = await User.findOne(users[i].id);
    userData.push({
      address: val.address,
      name: val.name,
      avatar: val.avatar,
      isFolded: users[i].isFolded
    });
  }
  return userData;
};

roomSchema.methods.foldUserByAddress = async function (foldAddress) {
  // changing the status of the user to fold for specific user../
  const room = this;
  const users = room.users;
    var updatedUsers = [];
    for(let i in users){
        console.log(users[i]);
        const oneUser = await User.findById(users[i].id);
        console.log(oneUser.address, foldAddress);
        if (oneUser.address === foldAddress) {
            console.log(users[i])
            updatedUsers.push({ ...users[i], isFolded: true });
        }
        else{
            updatedUsers.push(users[i]);
        }
        
    }

  room.users = updatedUsers;
  await room.save({ validateBeforeSave: false });
  return updatedUsers;
};

roomSchema.methods.getFirst4Cards = function () {
  if (this.status == "secondloop" || this.stauts == "thirdloop") {
    return this.encryptedDeck
      .map((item) => decryptWithPrivateKey(item, this.privateKey))
      .slice(-5)
      .slice(0, 4);
    // return decryptWithPrivateKey( this.encryptedGameDeck, this.privateKey).slice(-5).slice(0,4);
  }
};

roomSchema.methods.getFirst5Cards = function () {
  if (this.stauts == "thirdloop" || this.status == "ended") {
    return this.encryptedDeck
      .map((item) => decryptWithPrivateKey(item, this.privateKey))
      .slice(-5);
    // return decryptWithPrivateKey( this.encryptedGameDeck, this.privateKey).slice(-5);
  }
};

roomSchema.methods.getUserCardsVisId = async function (_id) {
  // const userId = await User.findById(_id);
  //apply condition  of game state...
  if (this.state === "resting") {
    return;
  }
  const users = this.users;
  let indexOfUser = -1;
  for (var i in users) {
    if (users[i].id.toString() === _id.toString()) {
      indexOfUser = i;
      break;
    }
  }

  if (indexOfUser == -1) {
    console.log("InTheCardFetch:userNotPresent");
    return;
  }

//   const first = await this.encryptedGameDeck[2 * indexOfUser];
//   const second = await this.encryptedGameDeck[2 * indexOfUser + 1];
    const first = await this.encryptedDeck[2 * indexOfUser];
    const second = await this.encryptedDeck[2 * indexOfUser + 1];
  const cards = [
    decryptWithPrivateKey(first, this.privateKey),
    decryptWithPrivateKey(second, this.privateKey)
  ];
  return cards;
};

roomSchema.methods.decodeCards = function () {
  // your decoding logic here
};

roomSchema.methods.updatePooledAmounnt = async function (pooledAmount) {
  const room = this;
  room.pooledAmount = pooledAmount;
  await room.save({ validateBeforeSave: false });
};

// instance method to add a user to the room
roomSchema.methods.addUser = async function (userId) {
  const room = this;
  const users = this.users;
  let userIn = false;
  console.log(userId, userId.toString());
  console.log(room.users[0]);
  for (var el in users) {
    // console.log("state:",users[el].id.toString() ===  userId.toString());
    if (users[el].id.toString() === userId.toString()) {
      console.log("userAllreadyexist::");
      userIn = true;
      return "isin";
    }
  }
  if (room.users.length >= 6 && !userIn) {
    return "full";
  }

  // for(var el in users){
  //     if(el?.id == userId){
  //         return false;
  //     }
  // }
  //else the user is not present..
  users.push({ id: userId, isFolded: false });
  await room.save({ validateBeforeSave: false });
  //checking if the room is... fill.. k then the game will start...
  if (users.length == 6) {
    if (this.status === "resting") {
      //meaning the game is ready to start....
      // calling game init...
      this.initGame();
    }
  }
  return users;
};
// instance method to remove a user from the room
roomSchema.methods.removeUser = async function (userId) {
  const room = this;
  const afterUsers = this.users.filter(
    (item) => item.id.toString() !== userId.toString()
  );
  this.users = afterUsers;
  await room.save({ validateBeforeSave: false });
  return this.users;
  //this is cpoied from the above function so if this contains error check above one too.
};

roomSchema.methods.initGame = function () {
  const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 1024,
    publicKeyEncoding: {
      type: "spki",
      format: "pem"
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem"
    }
  });

  this.publicKey = publicKey;
  this.privateKey = privateKey;
  //fetching a deck
  const randomDeck = getARandomDeck();

  this.encryptedDeck = randomDeck.map((element, index) =>
    encryptWithPublicKey(element, this.publicKey)
  );
  this.save({ validateBeforeSave: false }); //
  // calling the contract for init game...
};

roomSchema.methods.flushData = async function() {
    this.status = "resting";
    this.users = [];
    this.encryptedDeck = [];
    this.encryptedGameDeck = [];
    this.privateKey = "";
    this.publicKey = "";
    this.pooledAmount = 0;
    this.memberCount = 0;
    this.randomNumberGenerated = false;
    await this.save({ validateBeforeSave: false });
    this.initGame();
}
roomSchema.pre("validate", function (next) {
  if (!this.isNew) {
    return next();
  }
  // const _sponcerAddress = GenrateSopnecerWallet(this.contrctAddress);
  // this.sponcerAddress = _sponcerAddress;
  // //creating command to fetch the sponcer wallet....
  // console.log("in the per fxn.");
  //allready sending the sponcer wallet together....

  next();
});

roomSchema.pre("save", async function (next) {
  next();
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
