import { useQuery } from "@tanstack/react-query";
import { getUserTankBUCK } from "../utils/inj/tank/getUserTankBUCK";
import { PROTOCOL_ID } from "../utils/inj/constants";
import useInjWallet from "./useInjWallet";

const useMultiTankInfo = (refetchSec: number) => {
  const { address } = useInjWallet();

  const getTotalTankInfo = async () => {
    let userTotalBuckInTank = 0;

    return userTotalBuckInTank;
  };

  const {
    data: totalTankData,
    refetch: refetchTotalTankData,
    isLoading: loadingTotalTankData,
    isSuccess: successTotalTankData,
  } = useQuery({
    queryKey: ["getTotalTankInfo"],
    queryFn: () => getTotalTankInfo(),
    enabled: !!address,
    // refetchInterval: refetchSec * 1000,
    // refetchIntervalInBackground: true,
  });

  return {
    totalTankData,
    refetchTotalTankData,
    loadingTotalTankData,
    successTotalTankData,
  };
};

export default useMultiTankInfo;
