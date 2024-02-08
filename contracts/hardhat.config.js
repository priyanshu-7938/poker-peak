task("TEST","tests the contract with set and fetch").setAction(async ( pram, hre ) => {
  
});


/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {},
    ganache: {
      url: "http://127.0.0.1:8545", // Make sure this matches your Ganache settings
      accounts: [
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
        "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
        "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
        "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
        "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
        "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
        "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
      ],
    },
    pegesisTestnet: {
      url: "https://replicator.pegasus.lightlink.io/rpc/v1", // Replace with the actual Pantheon testnet URL
      chainId: 1891, // Replace with the chain ID of the Pantheon testnet
      accounts: [
        "0xb468b6263292af56fcb78cfce1fc83ba504422307b4baa6cb99b8f3d01ebd3d0"
      ],
    },
  },
  solidity: "0.8.0",
};
