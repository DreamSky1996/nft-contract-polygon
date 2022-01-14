require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('@openzeppelin/hardhat-upgrades');
require("dotenv").config();
const pk_deploy = process.env.PK_BSCTEST_DEPLOYER;
const pk_bsc_deploy = process.env.PK_BSC_DEPLOYER;
const pk_mumbai_deploy = process.env.PK_MUMBAI_DEPLOYER;
const bscScanKey = process.env.MUMBAISCANKEY;

module.exports = {
  // defaultNetwork: "bsctest",
  solidity: {
    version: "0.8.2",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {},
    bsctest: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      gasPrice: 30000000000,
      accounts: [pk_deploy],
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 30000000000,
      accounts: [pk_bsc_deploy],
    },
    mumbai: {
      url: "https://matic-mumbai.chainstacklabs.com",
      chainId: 80001,
      gasPrice: 30000000000,
      accounts: [pk_mumbai_deploy],
    }
  },
  etherscan: {
    apiKey: bscScanKey,
  }
};
