import { useQuery } from "@tanstack/react-query";
import { getUserTankEarn } from "../utils/inj/tank/getUserTankEarn";
import { PROTOCOL_ID } from "../utils/inj/constants";
import useInjWallet from "./useInjWallet";

export type EarnList = {
  [key: string]: number;
};

const useMultiEarnInfo = () => {
  const { address } = useInjWallet();
  const getTotalEarnInfo = async () => {
    const earnInfoList: EarnList = {};
    return earnInfoList;
  };

  const {
    data: totalEarnData,
    refetch: refetchTotalEarnData,
    isLoading: loadingTotalEarnData,
    isSuccess: successTotalEarnData,
  } = useQuery({
    queryKey: ["getTotalEarnInfo"],
    queryFn: () => getTotalEarnInfo(),
    enabled: !!address,
  });

  return {
    totalEarnData,
    refetchTotalEarnData,
    loadingTotalEarnData,
    successTotalEarnData,
  };
};

export default useMultiEarnInfo;
