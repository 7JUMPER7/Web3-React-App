const hre = require("hardhat");

async function main() {
  const Shop = await hre.ethers.getContractFactory("Shop");
  const shop = await Shop.deploy();

  await shop.deployed();
  console.log(shop.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
