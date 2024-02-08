// interact.js
const { ethers } = require("ethers");

async function main() {
  // Set up the provider and signer
  const provider = new ethers.JsonRpcProvider("HTTP://127.0.0.1:7545"); // replace with your Ganache URL
  const signer = new ethers.Wallet("0x746f794b7348f604ee8fd0d9eaaf8baf9e39eaaf3b8e21fd3339b93d624d75c2", provider); // replace with your private key

  // Replace with the address of your deployed contract
  const contractAddress = "0x9509D6718a104Dc517b05B74494d4793da603228";
  const contractABI = [
    {
      "inputs": [],
      "name": "fetch",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_val",
          "type": "uint256"
        }
      ],
      "name": "set",
      "outputs": [
        {
          "internalType": "bool", 
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  // Connect to the contract
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  try {
    // Call your contract function
    const result = await contract.set(100); // replace with your actual function name

    console.log("Function result:", result);
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
  
  try {
    // Call your contract function
    // console.log(await contract.fetch.staticCall());
    const resultFetch = await contract.fetch();
    console.log("Function result (fetch):", resultFetch.toString());
  } catch (error) {
    console.error("Error calling contract function (fetch):", error);
  }
}

main();
