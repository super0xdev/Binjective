import { useQuery } from "@tanstack/react-query";
import { getMultiAggregatorInfo } from "../utils/inj/oracle/getMultiAggregatorInfo";

const useMultiAggregator = (
  objectNameList: string[],
  objectIdList: string[],
  refetchSec: number
) => {
  const {
    data: oracleInfoList,
    refetch: refetchOrcaleInfo,
    isLoading: loadingOracleInfo,
  } = useQuery({
    queryKey: ["getMultiAggregatorInfo", objectNameList, objectIdList],
    queryFn: () => getMultiAggregatorInfo(),
    refetchInterval: refetchSec * 1000,
    // refetchIntervalInBackground: true,
  });
  return {
    oracleInfoList,
    refetchOrcaleInfo,
    loadingOracleInfo,
  };
};

export default useMultiAggregator;
