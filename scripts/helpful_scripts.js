const {ethers} = require('hardhat')

async function deploy(name, ...args) {   
    const Contract = await hre.ethers.getContractFactory(name);
    let contract;
    if(args){
        contract = await Contract.deploy(...args);
    } else {
        contract = await Contract.deploy();
    }

    await contract.deployed();
    console.log(`${name} deployed wtih address: ${contract.address}`);
    return[Contract, contract]
}


module.exports = {
    deploy,
}