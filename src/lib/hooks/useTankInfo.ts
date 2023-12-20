import { getUserTankBUCK } from "../utils/inj/tank/getUserTankBUCK";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useInjWallet from "./useInjWallet";

const useTankInfo = (tankType: string) => {
  const wallet = useInjWallet();

  const {
    data: tankInfoData,
    refetch: refetchTankInfoData,
    isLoading: loadingTankInfoData,
    isSuccess: successTankInfoData,
  } = useQuery({
    queryKey: ["getUserTankBUCK", wallet.address, tankType],
    queryFn: () => getUserTankBUCK(wallet.address ?? "", tankType),
    enabled: !!wallet.connected && !!wallet.address,
    // refetchInterval: refetchSec * 1000,
    // refetchIntervalInBackground: false,
  });

  return {
    tankInfoData,
    refetchTankInfoData,
    loadingTankInfoData,
    successTankInfoData,
  };
};

export default useTankInfo;
