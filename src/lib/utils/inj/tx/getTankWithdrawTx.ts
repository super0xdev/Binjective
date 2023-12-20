import type { Target, Coin, ContributorToken } from "types";
import { COIN_TYPE } from "../constants";
import OBJECTID from "../../objectIdMap";
import { parseBigInt } from "../../unit";

const { BUCK } = COIN_TYPE;

export const getTankWithdrawTx = (
  tankName: string,
  tankType: string,
  contributorTokens: ContributorToken[],
  withdrawAmount: number
) => {};
