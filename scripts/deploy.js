const { ethers, upgrades } = require("hardhat");

async function main() {
    const network = await ethers.provider.getNetwork();
    const accounts = await ethers.getSigners();

    const deployerAddress = await accounts[0].getAddress();

    console.log(`Deploying to network: ${network.name} (${network.chainId})`);
    console.log("Deployer address: " + deployerAddress);

    const NekoDAOTimelock = await ethers.getContractFactory("NekoDAOTimelock");
    const NekoDAOToken = await ethers.getContractFactory("NekoDAOToken");
    const NekoDAOGovernor = await ethers.getContractFactory("NekoDAOGovernor");

    console.log('Deploying NekoDAOTimelock...');
    const nekoDAOTimelock = await upgrades.deployProxy(NekoDAOTimelock, [
        180, // Delay in seconds
        [deployerAddress], // Proposer
        [deployerAddress], // Executor
        deployerAddress // Admin
    ]);
    await nekoDAOTimelock.waitForDeployment();
    const nekoDAOTimelockAddress = await nekoDAOTimelock.getAddress();
    console.log('NekoDAOTimelock deployed to:', nekoDAOTimelockAddress);

    console.log('Deploying NekoDAOToken...');
    const nekoDAOToken = await upgrades.deployProxy(NekoDAOToken, [
        nekoDAOTimelockAddress, // Token Admin
        nekoDAOTimelockAddress, // Minter
        nekoDAOTimelockAddress // Upgrader
    ]);
    await nekoDAOToken.waitForDeployment();
    const nekoDAOTokenAddress = await nekoDAOToken.getAddress();
    console.log('NekoDAOToken deployed to:', nekoDAOTokenAddress);

    console.log('Deploying NekoDAOGovernor...');
    const nekoDAOGovernor = await upgrades.deployProxy(NekoDAOGovernor, [
        nekoDAOTokenAddress, // Token
        nekoDAOTimelockAddress // Timelock
    ]);
    await nekoDAOGovernor.waitForDeployment();
    const nekoDAOGovernorAddress = await nekoDAOGovernor.getAddress();
    console.log('NekoDAOGovernor deployed to:', nekoDAOGovernorAddress);

    await nekoDAOGovernor.transferOwnership(nekoDAOTimelockAddress);
    console.log('NekoDAOGovernor ownership transferred to:', nekoDAOTimelockAddress);

    // Grant role "PROPOSER_ROLE" to governor
    await nekoDAOTimelock.grantRole("0xb09aa5aeb3702cfd50b6b62bc4532604938f21248a27a1d5ca736082b6819cc1", nekoDAOGovernorAddress);
    console.log('NekoDAOTimelock PROPOSER_ROLE granted to:', nekoDAOGovernorAddress);

    // Grant role "CANCELLER_ROLE" to governor
    await nekoDAOTimelock.grantRole("0xfd643c72710c63c0180259aba6b2d05451e3591a24e58b62239378085726f783", nekoDAOGovernorAddress);
    console.log('NekoDAOTimelock CANCELLER_ROLE granted to:', nekoDAOGovernorAddress);

    // Grant role "EXECUTOR_ROLE" to governor
    await nekoDAOTimelock.grantRole("0xd8aa0f3194971a2a116679f7c2090f6939c8d4e01a2a8d7e41d55e5351469e63", nekoDAOGovernorAddress);
    console.log('NekoDAOTimelock EXECUTOR_ROLE granted to:', nekoDAOGovernorAddress);

    // Renounce role "PROPOSER_ROLE" from deployer
    await nekoDAOTimelock.renounceRole("0xb09aa5aeb3702cfd50b6b62bc4532604938f21248a27a1d5ca736082b6819cc1", deployerAddress);
    console.log('NekoDAOTimelock PROPOSER_ROLE renounced from:', deployerAddress);

    // Renounce role "CANCELLER_ROLE" from deployer
    await nekoDAOTimelock.renounceRole("0xfd643c72710c63c0180259aba6b2d05451e3591a24e58b62239378085726f783", deployerAddress);
    console.log('NekoDAOTimelock CANCELLER_ROLE renounced from:', deployerAddress);

    // Renounce role "EXECUTOR_ROLE" from deployer
    await nekoDAOTimelock.renounceRole("0xd8aa0f3194971a2a116679f7c2090f6939c8d4e01a2a8d7e41d55e5351469e63", deployerAddress);
    console.log('NekoDAOTimelock EXECUTOR_ROLE renounced from:', deployerAddress);

    // Renounce role "TIMELOCK_ADMIN_ROLE" from deployer
    await nekoDAOTimelock.renounceRole("0x5f58e3a2316349923ce3780f8d587db2d72378aed66a8261c916544fa6846ca5", deployerAddress);
    console.log('NekoDAOTimelock TIMELOCK_ADMIN_ROLE renounced from:', deployerAddress);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
