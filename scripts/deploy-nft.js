const hre = require('hardhat')

const addressContract = "0xF048a4B3b31c1feE95351cc9C8b906A5FAC2D9B5";

async function main(){
    const nftContract = await hre.ethers.deployContract("CryptoDevs", [addressContract]);

    await nftContract.waitForDeployment();

    console.log("Contract deployed to:", nftContract.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })