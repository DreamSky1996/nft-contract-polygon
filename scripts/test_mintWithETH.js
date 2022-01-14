const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account: " + deployer.address);

  const largeApproval = '100000000000000000000000000000000';
  const initialMint = '10000000000000000000000000';
  const zeroAddress = '0x0000000000000000000000000000000000000000';
  console.log("Starting Minting with ETH");

  // Deploy MIM
  const NFT_TOKEN = await ethers.getContractFactory('NFT_TOKEN');
  const nftToken = await NFT_TOKEN.attach(mimBondAddress);

  await nftToken.
  

  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
