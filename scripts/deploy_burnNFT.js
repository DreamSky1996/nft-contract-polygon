const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account: " + deployer.address);

  const largeApproval = '100000000000000000000000000000000';
  const initialMint = '10000000000000000000000000';
  const zeroAddress = '0x0000000000000000000000000000000000000000';
  console.log("Deploy TESTNFT Token");

  // Deploy MIM
  const TESTNFT = await ethers.getContractFactory('TESTNFT');
  const testNFT = await TESTNFT.deploy();
  console.log("TESTNFT deployed on ", testNFT.address);

  await testNFT.safeMint(deployer.address);
  console.log("TESTNFT minted");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
