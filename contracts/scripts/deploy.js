// scripts/deploy.js
// const { ethers } = require("ethers");

async function main() {
    const PokerRoom = await ethers.getContractFactory("PokerRoom");
    const pokerRoom = await PokerRoom.deploy(["0xb055dd94A42356921d0ed99624B02F981Cc29240",100000000]);
  
    // const deployedPokerRoom = await pokerRoom.deployed();
    console.log(pokerRoom?.target);
    console.log("PokerRoom deployed");
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  