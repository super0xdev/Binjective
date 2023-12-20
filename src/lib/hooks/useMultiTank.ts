import { useQuery } from "@tanstack/react-query";
import { getMultiTankInfo } from "../utils/inj/tank/getMultiTankInfo";

const useMultiTank = () => {
  const {
    data: tankInfoList,
    refetch: refetchTankInfo,
    isLoading: loadingTankInfo,
  } = useQuery({
    queryKey: ["getMultiTankInfo"],
    queryFn: () => getMultiTankInfo(),
  });
  return {
    tankInfoList,
    refetchTankInfo,
    loadingTankInfo,
  };
};

export default useMultiTank;
