import { ethers } from "ethers";
import { task } from "hardhat/config";
import { COMMON_DEPLOY_PARAMS } from "../../helpers/env";

task("deploy-mock-usdt", "").setAction(async (_, hre) => {
  const { deploy } = hre.deployments;
  const [deployer] = await hre.ethers.getSigners();

  const usdt = await deploy("MockUSDT", {
    from: deployer.address,
    contract: "MockERC20",
    args: ["USDT", "USDT", 6],
    ...COMMON_DEPLOY_PARAMS,
  });
  console.log("mock usdt", usdt.address);
});
