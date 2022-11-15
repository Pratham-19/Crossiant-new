const hre = require("hardhat");

async function main() {
  const CrossiantToken = await hre.ethers.getContractFactory("CrossiantToken");
  const Crossiant = await CrossiantToken.deploy(1000000,25);
  await Crossiant.deployed();
  // console.log("Contract deployed to address:", myNFT.address);
  console.log(
   `deployed to ${Crossiant.address}`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
// 0x47a87f22B4928652eA82595d4E81cfC5b8018855