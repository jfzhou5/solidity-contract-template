require("dotenv").config({ quiet: true });

export const SKIP_LOAD = process.env.SKIP_LOAD === "true";

export const MNEMONIC_PATH = "m/44'/60'/0'/0";
export const MNEMONIC = process.env.MNEMONIC || "";
export const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

export const FORKING_ENABLED = process.env.FORKING_ENABLED
    ? process.env.FORKING_ENABLED?.toUpperCase() === "TRUE"
    : true;
