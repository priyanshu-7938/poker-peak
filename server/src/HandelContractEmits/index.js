import Room from "../models/room.js";
import User from "../models/user.js";
import { decryptWithPrivateKey, GameInitBaby, GameResetBaby} from "../utils/cardDeck.js";

const UserFoldedWithReason = async (data, io) => {
    //folding the user whith the given addres
    //the user is to be folded.... via address...
    const room = await Room.findByAddressValue(data.transaction.address);
    await room.foldUserByAddress(data.data.foldAddress);
    
    io.emit("UserFoldedWithReason",{
        reason: data.data.reason,
        addressToFOld: data.data.foldAddress,
        users: room.users,
    });
    console.log("!!Game Important: The user folded ,with reason:",data.data.reason);
}
const betRaised = async (data, io) => {
// createdBy , uint256 indexed nonce, address raisersAddress, uint256 raisedTo, uint256 currentPot, address nextUser)
    const room = await Room.findByAddressValue(data.transaction.address);
    await room.updatePooledAmounnt(data.data.currentPot);

    io.emit("betRaised",{
        currentBet:data.data.raisedTo,
        currentPool:data.data.currentPot,
        expectedUser: data.data.nextUser,
        raisedByAddress:raiserAddress,
    })
    console.log("!!Game Important: The bet was raised.");
}
const betCalled = async (data, io) => {
    //emitCode , uint256 indexed createdOn , address indexed createdBy , uint256 indexed nonce, address callerAddress, uint256 currentPot, address nextUser
    const room = await Room.findByAddressValue(data.transaction.address);
    await room.updatePooledAmounnt(data.data.currentPot);

    io.emit("betCalled",{
        currentBet:data.data.raisedTo,
        currentPool:data.data.currentPot,
        expectedUser: data.data.nextUser,
        raisedByAddress:raiserAddress,
    })
    console.log("!!Game Important: The bed was called...");

}
const deckPost = async (data, io) => {
    // (uint8 emitCode , uint256 indexed createdOn , address indexed createdBy , uint256 indexed nonce , string[] cards17);
    const room = await Room.findByAddressValue(data.transaction.address);
    room.encryptedGameDeck = data.data.cards17;
    await room.save({validateBeforeSave:false});
    io.emit("deckPost",{
        "status":200,
        "msg":"deck was posted.",
    });
    console.log("!!Game Important: The game deck is fetched at the server...");
}
const pKeyExposed = async (data, io) => {
    io.emit("pKeyExposed",{
        "status":200,
        "msg":"PkeyIsExposed",
    });
}
const StateDiscloser = async (data, io) => {
    //uint8 emitCode , uint256 indexed createdOn , uint256 indexed nonce, GameState stateTransitationTo
    const room = await Room.findByAddressValue(data.transaction.address);
    room.status = data.data.stateTransitationTo;
    await room.save({validateBeforeSave:false});
    io.emit("StateDiscloser",{
        "status":data.data.stateTransitationTo,
        "msg":"Status was updated",
    });
    if(data.data.stateTransitationTo === "ended" ){
        GameResetBaby(room.contrctAddress);
    }
    console.log("!!Game Important: The game state changed.");

}
const RandomNumberGenerated = async (data, io) => {
    //(uint8 emitCode , uint256 indexed createdOn ,address indexed createdBy ,  uint256 indexed nonce , uint256 randomNumber )
    const room = await Room.findByAddressValue(data.transaction.address);
    room.randomNumberGenerated = true;
    await room.save({validateBeforeSave:false});
    //if the room size is full that is the size is 6 then we would jus initiate the game here itself...
    if(room.users.length == 6 ){
        //wallaha we can proceed to the game
        GameInitBaby(room.contrctAddress);
    }
    console.log("!important rand generated....");
    io.emit("RandomNumberGenerated",{
        "status":200,
        "msg":"Deck was poseted.",
    });
}
const WithdrawalRequested = async (data, io) => {
    //widrawal.. request was emited...
}

/*
    event UserFoldedWithReason(uint8 emitCode , uint256 indexed createdOn , address indexed createdBy,  uint256 indexed nonce, address foldAddress, string reason);
    event betRaised(uint8 emitCode , uint256 indexed createdOn , address indexed createdBy , uint256 indexed nonce, address raisersAddress, uint256 raisedTo, uint256 currentPot, address nextUser);
    event betCalled(uint8 emitCode , uint256 indexed createdOn , address indexed createdBy , uint256 indexed nonce, address callerAddress, uint256 currentPot, address nextUser);
    event deckPost(uint8 emitCode , uint256 indexed createdOn , address indexed createdBy , uint256 indexed nonce , string[] cards17);
    event pKeyExposed(uint8 emitCode , uint256 indexed createdOn , address indexed createdBy , uint256 indexed nonce , string privateKey);
    event StateDiscloser(uint8 emitCode , uint256 indexed createdOn , uint256 indexed nonce, GameState stateTransitationTo);
    event RandomNumberGenerated(uint8 emitCode , uint256 indexed createdOn ,address indexed createdBy ,  uint256 indexed nonce , uint256 randomNumber );
    event WithdrawalRequested(uint8 emitCode , address indexed createdBy, address indexed airnode, address indexed sponsorWallet);
*/




export { betRaised, UserFoldedWithReason, betCalled, deckPost, pKeyExposed, StateDiscloser, WithdrawalRequested, RandomNumberGenerated };