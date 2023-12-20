import { useQuery } from "@tanstack/react-query";
import { getMultiBucketInfo } from "../utils/inj/bucket/getMultiBucketInfo";

const useMultiBucketInfo = (refetchSec: number) => {
  const {
    data: totalBucketData,
    refetch: refetchTotalBucketInfo,
    isLoading: loadingTotalBucketInfo,
  } = useQuery({
    queryKey: ["getMultiBucketInfo"],
    queryFn: () => getMultiBucketInfo(),
    // refetchInterval: refetchSec * 1000,
    // refetchIntervalInBackground: true,
  });
  return {
    totalBucketData,
    refetchTotalBucketInfo,
    loadingTotalBucketInfo,
  };
};

export default useMultiBucketInfo;
