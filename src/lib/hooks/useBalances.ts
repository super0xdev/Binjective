import { useQuery } from "@tanstack/react-query";
import { getBalances } from "../utils/inj/balances/getBalances";
import useInjWallet from "./useInjWallet";

const useBalances = (coinTypes: string[], decimals: number[]) => {
  const wallet = useInjWallet();
  const {
    data: balances,
    refetch: refetchBalances,
    isLoading: loadingBalances,
    isSuccess: successBalances,
  } = useQuery({
    queryKey: ["getBalances", coinTypes, decimals, wallet.address],
    queryFn: () => getBalances(wallet.address ?? "", coinTypes, decimals),
    enabled: !!wallet.connected && !!wallet.address,
  });
  return {
    balances,
    refetchBalances,
    loadingBalances,
    successBalances,
  };
};

export default useBalances;
