import { getUserTankEarn } from "../utils/inj/tank/getUserTankEarn";
import { useQuery } from "@tanstack/react-query";
import useInjWallet from "./useInjWallet";

const useEarnInfo = (coinSymbol: string, tankType: string) => {
  const { address } = useInjWallet();

  const {
    data: earnInfoData,
    refetch: refetchEarnInfoData,
    isLoading: loadingEarnInfoData,
    isSuccess: successEarnInfoData,
  } = useQuery({
    queryKey: ["getUserTankEarn", coinSymbol, tankType],
    queryFn: () => getUserTankEarn(coinSymbol, tankType),
    enabled: !!address,
  });

  return {
    earnInfoData,
    refetchEarnInfoData,
    loadingEarnInfoData,
    successEarnInfoData,
  };
};

export default useEarnInfo;
