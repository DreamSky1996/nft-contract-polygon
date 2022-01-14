const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account: " + deployer.address);

  const largeApproval = '100000000000000000000000000000000';
  const initialMint = '10000000000000000000000000';
  const zeroAddress = '0x0000000000000000000000000000000000000000';
  console.log("Deploy Mintable Token");

  // Deploy MIM
  const MT = await ethers.getContractFactory('AnyswapV5ERC20');
  const mt = await MT.deploy("Mintable Token", "MT", 18, zeroAddress, deployer.address);
  console.log("MT deployed on ", mt.address);

  await mt.initVault(deployer.address);
  await mt.mint( deployer.address, initialMint );
  console.log("MT minted ", initialMint);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
