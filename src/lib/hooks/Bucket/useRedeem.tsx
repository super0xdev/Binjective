import { toast } from "react-toastify";

import { useMutation } from "@tanstack/react-query";
import { COIN_TYPE } from "~/lib/utils/inj/constants";
import Link from "next/link";
import useInjWallet from "../useInjWallet";

const useRedeem = (coinSymbol: string, redeemAmount: number) => {
  const { address } = useInjWallet();

  const redeem = async (coinSymbol: string, redeemAmount: number) => {
    try {
      if (!address) return;
    } catch (err) {}
  };
  const { mutate: executeRedeem, isLoading: loadingRedeem } = useMutation({
    mutationKey: ["redeem", coinSymbol, redeemAmount],
    mutationFn: () => redeem(coinSymbol, redeemAmount),
  });
  return {
    executeRedeem,
    loadingRedeem,
  };
};

export default useRedeem;
