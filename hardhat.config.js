require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks:{
    sepolia:{
      url: process.env.SEPOLIA_TESTNET,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
  etherscan:{
    apiKey: process.env.API_KEY
  }
};
