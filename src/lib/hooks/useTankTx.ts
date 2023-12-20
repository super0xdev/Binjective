import { toast } from "react-toastify";
import { COIN_TYPE } from "../utils/inj/constants";
import { getTankDepositTx } from "../utils/inj/tx/getTankDepositTx";
import { getTankWithdrawTx } from "../utils/inj/tx/getTankWithdrawTx";
import type { ContributorToken } from "types";
import useInjWallet from "./useInjWallet";

const { BUCK } = COIN_TYPE;

const tankTypeToContributorTokenType = (tankType: string) => {
  return `0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::tank::ContributorToken<0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::BUCK, ${tankType}>`;
};

const useTankTx = () => {
  const { address } = useInjWallet();

  const deposit = async (tankType: string, depositAmount: number) => {
    try {
      if (!address) return;
    } catch (err) {}
  };

  const withdraw = async (tankName: string, tankType: string) => {
    try {
      if (!address) return;
    } catch (err) {}
  };

  const claim = async (tankType: string, depositAmount: number) => {
    try {
      if (!address) return;
    } catch (err) {}
  };

  return { deposit, withdraw };
};

export default useTankTx;
