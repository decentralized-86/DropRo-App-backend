require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("hardhat-contract-sizer")
require("dotenv").config()

/**
 * @type import('hardhat/config').HardhatUserConfig
*/
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x"
const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL 
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL 
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY 
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY 
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        localhost: {
            chainId: 31337,
        },
        Mumbai: {
          url: POLYGON_RPC_URL,
          accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
          saveDeployments: true,
          chainId: 80001,
      },
        sepolia: {
          url: SEPOLIA_RPC_URL,
          accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
          saveDeployments: true,
          chainId: 11155111,
      },
    },
    etherscan: {
        apiKey: {
            sepolia: ETHERSCAN_API_KEY,
          polygonMumbai: POLYGONSCAN_API_KEY,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
        player: {
            default: 1,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.15",
            },
        ],
    },
    mocha: {
        timeout: 500000, // 500 seconds max for running tests
    },
}