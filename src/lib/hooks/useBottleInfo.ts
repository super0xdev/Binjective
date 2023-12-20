import { useQuery } from "@tanstack/react-query";
import { getBottleInfo } from "../utils/inj/bottle/getBottleInfo";
import useInjWallet from "./useInjWallet";

const useBottleInfo = (coinType: string) => {
  const wallet = useInjWallet();
  const { address, connected } = wallet;
  const {
    data: bottleInfo,
    refetch: refetchBottleInfo,
    isLoading: loadingBottleInfo,
  } = useQuery({
    queryKey: ["getBottleInfo", address],
    queryFn: () => getBottleInfo(address || "", coinType),
    // enabled: !!connected && !!address,
  });
  return {
    bottleInfo,
    refetchBottleInfo,
    loadingBottleInfo,
  };
};

export default useBottleInfo;
