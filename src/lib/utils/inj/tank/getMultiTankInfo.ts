import { PROTOCOL_ID } from "../constants";
import { MARKET_COINS_TYPE_LIST } from "../../constants";

type TankResponseResult = {
  reserve: string;
  collateral_pool: string;
  current_s: string;
  current_p: string;
};

type TankInfo = {
  buckReserve: string;
  collateralPool: string;
  currentS: string;
  currentP: string;
};

export type TankList = {
  [key: string]: TankInfo;
};

export const getMultiTankInfo = async () => {
  try {
    const tankInfoList: TankList = {};

    return tankInfoList;
  } catch (error) {
    return undefined;
  }
};
