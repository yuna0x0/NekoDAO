const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const NekoDAOTimelock = artifacts.require("NekoDAOTimelock");
const NekoDAOToken = artifacts.require("NekoDAOToken");
const NekoDAOGovernor = artifacts.require("NekoDAOGovernor");

module.exports = async (deployer, network, accounts) => {
    console.log("Deploying to network: " + network);
    console.log("Deployer address: " + accounts[0]);

    await deployProxy(NekoDAOTimelock, [
        180, // Delay in seconds
        [accounts[0]], // Proposer
        [accounts[0]], // Executor
        accounts[0] // Admin
    ], { deployer });

    await deployProxy(NekoDAOToken, [
        NekoDAOTimelock.address, // Token Admin
        NekoDAOTimelock.address, // Minter
        NekoDAOTimelock.address // Upgrader
    ], { deployer });

    await deployProxy(NekoDAOGovernor, [
        NekoDAOToken.address, // Token
        NekoDAOTimelock.address // Timelock
    ], { deployer });

    const nekoDAOTimelock = await NekoDAOTimelock.deployed();
    const nekoDAOGovernor = await NekoDAOGovernor.deployed();

    await nekoDAOGovernor.transferOwnership(nekoDAOTimelock.address);

    // Grant role "PROPOSER_ROLE" to governor
    await nekoDAOTimelock.grantRole("0xb09aa5aeb3702cfd50b6b62bc4532604938f21248a27a1d5ca736082b6819cc1", nekoDAOGovernor.address);

    // Grant role "CANCELLER_ROLE" to governor
    await nekoDAOTimelock.grantRole("0xfd643c72710c63c0180259aba6b2d05451e3591a24e58b62239378085726f783", nekoDAOGovernor.address);

    // Grant role "EXECUTOR_ROLE" to governor
    await nekoDAOTimelock.grantRole("0xd8aa0f3194971a2a116679f7c2090f6939c8d4e01a2a8d7e41d55e5351469e63", nekoDAOGovernor.address);

    // Renounce role "PROPOSER_ROLE" from deployer
    await nekoDAOTimelock.renounceRole("0xb09aa5aeb3702cfd50b6b62bc4532604938f21248a27a1d5ca736082b6819cc1", accounts[0]);

    // Renounce role "CANCELLER_ROLE" from deployer
    await nekoDAOTimelock.renounceRole("0xfd643c72710c63c0180259aba6b2d05451e3591a24e58b62239378085726f783", accounts[0]);

    // Renounce role "EXECUTOR_ROLE" from deployer
    await nekoDAOTimelock.renounceRole("0xd8aa0f3194971a2a116679f7c2090f6939c8d4e01a2a8d7e41d55e5351469e63", accounts[0]);

    // Renounce role "TIMELOCK_ADMIN_ROLE" from deployer
    await nekoDAOTimelock.renounceRole("0x5f58e3a2316349923ce3780f8d587db2d72378aed66a8261c916544fa6846ca5", accounts[0]);
};
