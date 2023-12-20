const IS_MAINNET = process.env.NEXT_PUBLIC_ACTIVE_CHAIN === "mainnet";

// Testnet
export const TESTNET_PACKAGE_ID =
  "0x6f206ba15a7d81662e20ac1e6a4e0b443f3972861327584e8a1148c9880e4a09";
export const TESTNET_PROTOCOL_ID =
  "0x8b7ff1f21c8e80683a4504f8e564ad42e51361875ecce8c9ecc5596a67abd225";
export const TESTNET_CONTRIBUTOR_TOKEN_ID =
  "0x1ca47988f33d06d748a779e78f321b9ba74f6ad25b3de2840da425022dfaa969";

// Mainnet
export const MAINNET_PACKAGE_ID =
  "0x155a2b4a924288070dc6cced78e6af9e244c654294a9863aa4b4544ccdedcb0f";
export const MAINNET_PROTOCOL_ID =
  "0x9e3dab13212b27f5434416939db5dec6a319d15b89a84fd074d03ece6350d3df";
export const MAINNET_CONTRIBUTOR_TOKEN_ID =
  "0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2";

export const PACKAGE_ID = IS_MAINNET ? MAINNET_PACKAGE_ID : TESTNET_PACKAGE_ID;
export const PROTOCOL_ID = IS_MAINNET
  ? MAINNET_PROTOCOL_ID
  : TESTNET_PROTOCOL_ID;

export const CONTRIBUTOR_TOKEN_ID = IS_MAINNET
  ? MAINNET_CONTRIBUTOR_TOKEN_ID
  : TESTNET_CONTRIBUTOR_TOKEN_ID;

export const SWITCHBOARD_UPDATE_TARGET =
  "0xe2077d678de929d64d3fcd79c1adfbd23d97324e9bae3a60102d44367fbe008c::bucket_oracle::update_price_from_switchboard";

export const SUPRA_UPDATE_TARGET =
  "0xe2077d678de929d64d3fcd79c1adfbd23d97324e9bae3a60102d44367fbe008c::bucket_oracle::update_price_from_supra";

export const SUPRA_HANDLER_OBJECT =
  "0xaa0315f0748c1f24ddb2b45f7939cff40f7a8104af5ccbc4a1d32f870c0b4105";

export const COIN_TYPE = {
  INJ: "0x00",
  BUCK: "0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::BUCK",
};

export const GAS_BUDGET = 10 ** 8;

export const MODULES = {
  BORROW: "bucket_operations::borrow",
  REDEEM: "bucket_operations::redeem",
  REPAY: "bucket_operations::repay",
  PURELY_REPAY: "bucket_operations::purely_repay",
  TANK_DEPOSIT: "tank_operations::deposit",
  TANK_WITHDRAW: "tank_operations::withdraw",
  TANK_CLAIM: "tank_operations::claim",
};

export const SWITCHBOARD_AGGREGATOR =
  "0xbca474133638352ba83ccf7b5c931d50f764b09550e16612c9f70f1e21f3f594";
