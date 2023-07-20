console.log("starting");
const { deployments,getNamedAccounts,network } = require("hardhat");
const {verify} = require("../utils/verify")
const developmentchains = ["localhost,hardhat"];
const chainId = network.config.chainId;
module.exports = async ()=>{
    const {deploy,log} = deployments;
    const {deployer} = await getNamedAccounts();
    const args=[];
    console.log("deploying.......");
    const Storage = await deploy("Storage",{
        from:deployer,
        args:args,
        log:true,
        waitConfirmations:5,
    });
    console.log("---------------------------------");
    if(!developmentchains.includes(network.name) &&  process.env.ETHERSCAN_API_KEY){
        log("Verifying...");
        await verify(Storage.address,args);
    }
}
