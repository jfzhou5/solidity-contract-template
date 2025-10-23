import { scope } from "hardhat/config";
import { COMMON_DEPLOY_PARAMS } from "../../helpers/env";

const deployMockUsdtScope = scope("mock-usdt", "deploy mock usdt");

deployMockUsdtScope.task("deploy", "").setAction(async (_, hre) => {
    const { deploy } = hre.deployments;
    const [deployer] = await hre.ethers.getSigners();

    const usdt = await deploy("MockUSDT", {
        from: deployer.address,
        contract: "MockERC20",
        args: ["USDT", "USDT", 6],
    });
    console.log("mock usdt", usdt.address);
});
