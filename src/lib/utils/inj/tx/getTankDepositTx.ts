import type { Target, Coin } from "types";
import {
  PACKAGE_ID,
  SWITCHBOARD_AGGREGATOR,
  COIN_TYPE,
  GAS_BUDGET,
  MODULES,
} from "../constants";

const { BUCK } = COIN_TYPE;

export const getTankDepositTx = (
  tankType: string,
  coins: Coin[],
  depositAmount: number
) => {};
