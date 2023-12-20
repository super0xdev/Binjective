import type { MarketCoin, NavItem } from "types";
import { PROTOCOL_ID } from "./inj/constants";

export const MAINNET = "mainnet";
export const TESTNET = "testnet";
export const ACTIVE_CHAIN =
  process.env.NEXT_PUBLIC_ACTIVE_CHAIN === "mainnet" ? MAINNET : TESTNET;

export const DEFAULT_DECIMAL = 9;
export const SHOW_CAMPAIGN = true;
export const MIN_BORROWED_DEBT = 10;
export const WORMHOLE_STYLE = "dark"; // light, dark
export const BLOCK_REGIONS = ["US"];
// export const BLOCK_REGIONS = ['US', 'RU', 'KP', 'TW', 'CN', 'HK'];

export const EVENTS = {
  LANDING: "app_click_landing",
  STAKE: "app_click_stake",
  MARKET: "app_click_market",
  TWITTER: "app_click_twitter",
  TELEGRAM: "app_click_telegram",
  DISCORD: "app_click_discord",
  MEDIUM: "app_click_medium",
  AUDIT: "app_click_audit",
  // navbar
  NAV: "app_click_nav",
  // position
  POSITION: "app_click_position",
  DEPOSIT: "app_click_deposit",
  WITHDRAW: "app_click_withdraw",
};

export const URLS = {
  app: "https://app.bucketprotocol.io/",
  medium: "https://medium.com/@bucketprotocol",
  whitepaper: "https://docsend.com/view/njkevgg6tn3qsppx",
  doc: "https://docs.bucketprotocol.io/",
  aftermath: "https://aftermath.finance/stake",
};

export const NAV_LIST = [
  {
    id: "whitepaper",
    name: "Whitepaper",
    path: URLS.whitepaper,
  },
  {
    id: "blog",
    name: "Blog",
    path: URLS.medium,
  },
  {
    id: "doc",
    name: "Docs",
    path: URLS.doc,
  },
];

export const NAVS: NavItem[] = [
  {
    name: "Overview",
    url: "/",
  },
  {
    name: "Dashboard",
    url: "/dashboard",
  },
  {
    name: "Earn",
    url: "/earn",
  },
];

export type ACCEPT_ASSETS = "INJ" | "USDC" | "USDT";

//For token number, not price
export const ASSET_DECIAMLS: Record<ACCEPT_ASSETS, number> = {
  INJ: 9,
  USDC: 6,
  USDT: 6,
  // WBTC: 8,
  // WETH: 8,
};

export const MARKET_COINS_TYPE_LIST: Record<ACCEPT_ASSETS, string> = {
  INJ: "",
  USDC: "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN",
  USDT: "0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN",
  // // WBTC: "0xc50de8bf1f8f9b7450646ef2d72e80ef243b6e06b22645fceed567219f3a33c4::wbtc::WBTC",
  // WETH: "0xc50de8bf1f8f9b7450646ef2d72e80ef243b6e06b22645fceed567219f3a33c4::weth::WETH",
};

export const MARKET_COINS: MarketCoin[] = [
  {
    name: "Injective",
    symbol: "INJ",
    symbolToFetchPrice: "INJ",

    coinType: MARKET_COINS_TYPE_LIST.INJ,
    image: "/inj.png",
    decimal: ASSET_DECIAMLS.INJ,
  },
  // {
  //   name: "Bitcoin",
  //   symbol: "WBTC",
  //   coinType:
  //     "0xc50de8bf1f8f9b7450646ef2d72e80ef243b6e06b22645fceed567219f3a33c4::wbtc::WBTC",
  //   image: "/btc-light.png",
  //   decimal: ASSET_DECIAMLS.WBTC ?? 9,
  // },
  // {
  //   name: "Ethereum",
  //   symbol: "WETH",
  //   coinType:
  //     "0xc50de8bf1f8f9b7450646ef2d72e80ef243b6e06b22645fceed567219f3a33c4::weth::WETH",
  //   image: "/eth-light.png",
  //   decimal: ASSET_DECIAMLS.WETH ?? 9,
  // },
  {
    name: "USDT",
    symbol: "USDT",
    symbolToFetchPrice: "USDT",
    coinType: MARKET_COINS_TYPE_LIST.USDT,
    image: "/usdt-light.png",
    decimal: ASSET_DECIAMLS.USDT,
  },
  {
    name: "USDC",
    symbol: "USDC",
    symbolToFetchPrice: "USDC",
    coinType: MARKET_COINS_TYPE_LIST.USDC,
    image: "/usdc-light.png",
    decimal: ASSET_DECIAMLS.USDC,
  },
];

// TODO: fix discription
export const HINTS = [
  {
    img: "/info.png",
    title: "About",
    description: `Bucket is a CDP DeFi protocol built on Injective that optimizes fund efficiency and 
      offers $BUCK as a stablecoin. Get diverse yield pools, flashloans, and an overcollateralized 
      stablecoin on the most robust DeFi engine on Injective.`,
  },
  {
    img: "/risk.png",
    title: "Risks",
    description: `The quantity of borrowed stablecoin $BUCK should not exceed 
    110% of the collateral value; for USDC and USDT, the limit is set at 105%. 
    Cryptocurrency prices are volatile, and it is important to monitor 
    your collateral ratio. If the collateral ratio falls below 110%, 
    liquidation will be triggered. It is advisable to maintain a collateral 
    ratio of 150% or higher.`,
  },
  {
    img: "/reward.png",
    title: "Rewards",
    description: `As a liquidity provider in Tank, you could receive a portion 
    of the remaining value from liquidated collateral. By providing liquidity for 
    $BUCK on DEX and staking LP tokens, you can earn $BKT. $BKT holders can share 
    protocol's revenue through lending, redemption, Flash Loans, and other activities.`,
  },
];

export const TANK_LIST = [
  {
    id: "inj",
    name: "INJ",
    img: "/inj.png",
  },
  // {
  //   id: "btc",
  //   name: "WBTC",
  //   img: "/btc-light.png",
  // },
  // {
  //   id: "eth",
  //   name: "WETH",
  //   img: "/eth-light.png",
  // },
  {
    id: "usdt",
    name: "USDT",
    img: "/usdt-light.png",
  },
  {
    id: "usdc",
    name: "USDC",
    img: "/usdc-light.png",
  },
];

export const REFETCH_SEC = 5;
