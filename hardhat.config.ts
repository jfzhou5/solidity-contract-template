import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "hardhat-dependency-compiler";
import { loadTasks } from "./helpers/utils";
import { FORKING_ENABLED, MNEMONIC, MNEMONIC_PATH, PRIVATE_KEY, SKIP_LOAD } from "./helpers/env";

// Prevent to load tasks before compilation and typechain
if (!SKIP_LOAD) {
    loadTasks(["deploy", "misc"]); // load task folders
}

const accounts =
    (PRIVATE_KEY && { accounts: [PRIVATE_KEY] }) ||
    (MNEMONIC && {
        accounts: {
            mnemonic: MNEMONIC,
            path: MNEMONIC_PATH,
            initialIndex: 0,
            count: 10,
        },
    });

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: "0.8.28",
                settings: {
                    optimizer: { enabled: true, runs: 100_000 },
                },
            },
        ],
    },
    dependencyCompiler: {
        paths: ["@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol"],
    },
    defaultNetwork: "testnet",
    networks: {
        hardhat: {
            forking: {
                enabled: FORKING_ENABLED,
                url: "https://eth.api.onfinality.io/public",
            },
        },
        mainnet: {
            url: "https://rpc.ankr.com/eth",
            ...accounts,
            chainId: 1,
        },
        testnet: {
            url: "https://sepolia.drpc.org",
            ...accounts,
            chainId: 11155111,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
        },
    },
    paths: {
        deployments: "deployments",
    },
    typechain: {
        outDir: "typechain",
    },
};

export default config;
