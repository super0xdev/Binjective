import { useQuery } from "@tanstack/react-query";
import { getOracleInfo } from "../utils/oracle";
import { type DynamicFieldInput } from "types";

const useOracle = (input: DynamicFieldInput) => {
  const {
    data: oracleInfo,
    refetch: refetchOracleInfo,
    isLoading: loadingOracleInfo,
  } = useQuery({
    queryKey: ["getOracleInfo"],
    queryFn: () => getOracleInfo(input),
    enabled: !!input,
  });

  return {
    oracleInfo,
    refetchOracleInfo,
    loadingOracleInfo,
  };
};

export default useOracle;
