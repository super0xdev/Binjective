import type { ContributorToken } from "types";
import { U64FromBytes } from "../../tools";
import { formatUnits } from "../../unit";
import { PROTOCOL_ID } from "../constants";
import { ASSET_DECIAMLS, type ACCEPT_ASSETS } from "../../constants";

const tankTypeToContributorTokenType = (tankType: string) => {
  return `0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::tank::ContributorToken<0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::BUCK, ${tankType}>`;
};

export const getUserTankEarn = async (coinSymbol: string, tankType: string) => {
  try {
    let total = 0;

    return total;
  } catch (err) {
    console.error(err);
  }
};
