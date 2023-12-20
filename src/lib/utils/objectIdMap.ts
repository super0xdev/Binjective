import { PROTOCOL_ID } from "./inj/constants";

// const TANK_ID: Record<string, string> = {
//   USDT: "0x20bfc26a95bdda2a374591429ef340606a587dfe6c06a7adde1f9cc2cbeb69a3",
//   USDC: "0x2b991c79cb4f7e2666ecf47eb437ab8972ffd74d4b6dd62332fd0551922467cb",
//   WBTC: "0xf85d8cf136b62068652d320d4e5fe613dd196abb6deeee55f7198e5700cd2171",
//   WETH: "0x377189ce7f5c2fe29f7197a600f5acb44f854c9590f26bf6a71bc98663dcc01d",
// };

const SWITCHBOARD_ID: Record<string, string> = {
  // USDT: "0xe8a09db813c07b0a30c9026b3ff7d5617d2505a097f1a90a06a941d34bee9585",
  // USDC: "0xde58993e6aabe1248a9956557ba744cb930b61437f94556d0380b87913d5ef47",
  // WBTC: "0x7c30e48db7dfd6a2301795be6cb99d00c87782e2547cf0c63869de244cfc7e47",
  // WETH: "0x68ed81c5dd07d12c629e5cdad291ca004a5cd3708d5659cb0b6bfe983e14778c",
};

const SUPRA_COIN_OBJECTID: Record<string, string> = {
  USDC: "0x1c400c096e8b52a22c43c080fea4aa22661c9a35b469493dfac5332aecb4789c",
  USDT: "0x11ea8c7b6287f1410c8bac2e475b4fe6fea45fd59e036a058522ab3acec8fed3",
};

const SUPRA_ID: Record<string, string> = {
  USDT: "48",
  USDC: "89",
  // WBTC: "18",
  // WETH: "19",
};

const OBJECTID = {
  BUCKET_PROTOCOL: PROTOCOL_ID,
  // TANK: TANK_ID,
  SWITCHBOARD: SWITCHBOARD_ID,
  SUPRAOBJECTID: SUPRA_COIN_OBJECTID,
  SUPRA: SUPRA_ID,
};

export default OBJECTID;
