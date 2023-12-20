import { useQuery } from "@tanstack/react-query";
import { getMultiBottleInfo } from "../utils/inj/bottle/getMultiBottleInfo";
import useInjWallet from "./useInjWallet";

const useMultiBottleInfo = (refetchSec: number) => {
  const { address } = useInjWallet();
  const {
    data: bottleInfo,
    refetch: refetchBottleInfo,
    isLoading: loadingBottleInfo,
    isSuccess: successBottleInfo,
  } = useQuery({
    queryKey: ["getMultiBottleInfo", address],
    queryFn: () => getMultiBottleInfo(address ?? ""),
    enabled: !!address,
    // refetchInterval: refetchSec * 1000,
    // refetchIntervalInBackground: true,
  });
  return {
    bottleInfo,
    refetchBottleInfo,
    loadingBottleInfo,
    successBottleInfo,
  };
};

export default useMultiBottleInfo;
