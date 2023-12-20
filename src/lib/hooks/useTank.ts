import { useQuery } from "@tanstack/react-query";
import { getTankInfo } from "../utils/inj/tank/getTankInfo";
import useInjWallet from "./useInjWallet";

const useTank = (objectId: string) => {
  const wallet = useInjWallet();
  const {
    data: tankInfo,
    refetch: refetchTankInfo,
    isLoading: loadingTankInfo,
  } = useQuery({
    queryKey: ["getTankInfo", objectId],
    queryFn: () => getTankInfo(objectId),
    enabled: !!wallet.connected && !!wallet.address,
  });
  return {
    tankInfo,
    refetchTankInfo,
    loadingTankInfo,
  };
};

export default useTank;
