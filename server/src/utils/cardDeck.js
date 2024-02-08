import { spawn } from 'child_process';
import dotenv from "dotenv";
import Room from "../models/room.js";
import User from '../models/user.js';
import { LightlinkPegasusTestnet } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";


dotenv.config();


import crypto from "crypto";
const CARDDECK =  ["2_s", "2_h", "2_d", "2_c", "3_s", "3_h", "3_d", "3_c", "4_s", "4_h", "4_d", "4_c", "5_s", "5_h", "5_d", "5_c", "6_s", "6_h", "6_d", "6_c", "7_s", "7_h", "7_d", "7_c", "8_s", "8_h", "8_d", "8_c", "9_s", "9_h", "9_d", "9_c", "10_s", "10_h", "10_d", "10_c", "J_s", "J_h", "J_d", "J_c", "Q_s", "Q_h", "Q_d", "Q_c", "K_s", "K_h", "K_d", "K_c", "A_s", "A_h", "A_d", "A_c"];
const sdk = ThirdwebSDK.fromPrivateKey("b468b6263292af56fcb78cfce1fc83ba504422307b4baa6cb99b8f3d01ebd3d0", LightlinkPegasusTestnet, {
    secretKey: "TbEJa6nQ01Nc7BHZuOG3jAiTOOTPN_AkeEmt8Qnlp7aQmgfzurz0z8_yiGOrVY-4CL5HdxHp4vbSxwkMzNuD8w",
  } );

const getARandomDeck = ()=>{
    const shuffledDeck = CARDDECK.map((item,index)=>{
        const a = 17;
        const buffer = crypto.randomBytes(4);
        const b = ( buffer.readUInt32BE(0) % 51 ) + 1;
        const randomIndex = ((index*a) + b)%52;
        return CARDDECK[randomIndex];
    })
    return shuffledDeck;
}
function encryptWithPublicKey(text, publicKey) {
    const bufferText = Buffer.from(text, 'utf-8');
    const encrypted = crypto.publicEncrypt(publicKey, bufferText);
    return encrypted.toString('base64');
}
function decryptWithPrivateKey(encryptedText, privateKey) {
    const bufferEncrypted = Buffer.from(encryptedText, 'base64');
    const decrypted = crypto.privateDecrypt(privateKey, bufferEncrypted);
    return decrypted.toString('utf-8');
}

const GenrateSopnecerWallet = (address) => {
    const airnodeXpub  = 'xpub6CuDdF9zdWTRuGybJPuZUGnU4suZowMmgu15bjFZT2o6PUtk4Lo78KGJUGBobz3pPKRaN9sLxzj21CMe6StP3zUsd8tWEJPgZBesYBMY7Wo';
    const airnodeAddress = '0x6238772544f029ecaBfDED4300f13A3c4FE84E1D';
    const sponsorAddress = address;

    const command = 'npx';
    const args = [
    '@api3/airnode-admin',
    'derive-sponsor-wallet-address',
    '--airnode-xpub', airnodeXpub,
    '--airnode-address', airnodeAddress,
    '--sponsor-address', sponsorAddress,
    ];

    /*
    @api3/airnode-admin derive-sponsor-wallet-address --airnode-xpub xpub6CuDdF9zdWTRuGybJPuZUGnU4suZowMmgu15bjFZT2o6PUtk4Lo78KGJUGBobz3pPKRaN9sLxzj21CMe6StP3zUsd8tWEJPgZBesYBMY7Wo --airnode-address 0x6238772544f029ecaBfDED4300f13A3c4FE84E1D --sponsor-address 0xe40ca8f5Df3c4ee03a8E4f9A35C7f86F4362326c


    */

    const airnodeProcess = spawn(command, args, { stdio: 'inherit' });

    airnodeProcess.on('exit', (code) => {
        if (code === 0) {
            console.log('Command executed successfully.');
            const sponsorWalletAddress = commandOutput.trim();
            return sponsorWalletAddress;    
        } else {
            console.error(`Error: Command exited with code ${code}`);
            return undefined;
        }
    });

    airnodeProcess.on('error', (err) => {
        console.error(`Error: ${err.message}`);
    });
}
const GameInitBaby = async (contractAddress) => {
    //game init baby...
    //TODO: remove the below comment it is there because it should nt be run this time cause it does not need to be for the first loop.

    _postDeckAndShuffel(contractAddress);
    
    const room = await Room.findByAddressValue(contractAddress);
    const users = room.users;
    let userArray = [];
    for(let i in users){
        const userData = await User.findById(users[i].id);
        userArray.push([userData.address, "Secret String",users[i].isFolded]);
    }
    //now posting to contract...
    try{
        const TheContract = await sdk.getContract(contractAddress);
        const data = await TheContract.call("gameInit", [userArray]);
        console.log("!!Game Important: Pushed The Users To Game And Now Rock.!");
        console.log(data);
    }
    catch(error){
        console.log("!!Fatel: ",error);
    }
}
const GameResetBaby = async (contractAddress) => {
    
    const room = await Room.findByAddressValue(contractAddress);
    const contract = await sdk.getContract(contractAddress);
    try{
        //privateKeyDeployed.
        await contract.call("uploadPrivateKey", [room.privateKey])
        console.log("!!Game Important: entered the GameDeckUploded.");
        //getting the expeectedUser he will be the winner...
        const _winner = await contract.call("expectedUserAddress", []);
        
        //calling the gameResetFunction
        //due to time constrains... im adding myself as the winner for each game this could be done.
        //via agorithm jus going tru the users and checking all the users cards and fold status, then outputtiing the winner...
        await contract.call("hardResetWithCleanup", [_winner]);
        console.log("!!Game Important: Reset The Game With CleanUp & Winner Funded");
        
        //now dbms cleanup... bebo and new initiation...
        room.flushData();
        
        // generate the random number...
        const _sponsorWallet = room.sponcerAddress;
        await contract.call("GenerateRandomNumber", [_sponsorWallet]);
        console.log("!!Game Important: The request for new random number if initiated.!");
    }catch(error){
        console.log("!!ERROR: at the resetting of the system...",error);
    }

}
const _postDeckAndShuffel = async (contractAddress) => {
    //uploding the deck of the game. AFTER: randGenerated.
    const room = await Room.findByAddressValue(contractAddress);    
    try{
        const TheContract = await sdk.getContract(contractAddress);
        const _deck = room.encryptedDeck;
        const data0 = await TheContract.call("uploadEncriptedDeck", [_deck])
        console.log("!!Game Important: entered the GameDeckUploded.");
        const data1 = await TheContract.call("shuffleDeck", []);
        console.log("!!Game Important: The deck is shuffeled.");
    }
    catch(error){
        console.log("!!ERROR: ",error);
    }
}

export {
    CARDDECK,
    GameInitBaby,
    GameResetBaby,
    getARandomDeck,
    decryptWithPrivateKey,
    encryptWithPublicKey,
    GenrateSopnecerWallet,
    
}