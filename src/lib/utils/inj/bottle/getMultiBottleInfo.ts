import type { BucketTypeInfo } from "types";
import { PROTOCOL_ID } from "../constants";
import { MARKET_COINS_TYPE_LIST } from "../../constants";

type BottleInfo = {
  collateralAmount: number;
  buckAmount: number; //user debt
  decimals: number;
};

type BottleInfoResult = {
  value: {
    fields: {
      value: {
        fields: {
          collateral_amount: number;
          buck_amount: number;
        };
      };
    };
  };
};

export type BottleAmountsList = {
  [key: string]: BottleInfo;
};

export const getMultiBottleInfo = async (address: string) => {
  if (!address) return null;

  try {
    const bottleAmountsList: BottleAmountsList = {};

    return bottleAmountsList;
  } catch (error) {
    return {};
  }
};
