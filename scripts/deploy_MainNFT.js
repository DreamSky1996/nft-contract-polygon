const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account: " + deployer.address);

  const largeApproval = '100000000000000000000000000000000';
  const initialMint = '10000000000000000000000000';
  const zeroAddress = '0x0000000000000000000000000000000000000000';
  const name = "NFT_TOKEN";
  const symbol = "NFT";
  const initBaseURI = "https://www.sewerratsocial.club/api/rats/metadata?id=";
  const mintableToken = "0x43f121Ab9e05C93d8928C50e2E03c8E954A91c32";
  const burnNFT = "0xd36CFFf910eC3955dB369eADBB8a9A4d8A1Bb500";
  console.log("Deploy Main NFT Token");

  // Deploy MIM
  const NFT_TOKEN = await ethers.getContractFactory('NFT_TOKEN');
  const nft = await NFT_TOKEN.deploy(name, symbol, initBaseURI, mintableToken, burnNFT);
  console.log("NFT_TOKEN deployed on ", nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
