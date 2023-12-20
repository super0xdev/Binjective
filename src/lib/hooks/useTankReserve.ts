import { useQuery } from "@tanstack/react-query";
import { getBalances } from "../utils/inj/balances/getBalances";
import useInjWallet from "./useInjWallet";

const useTankReserve = (coinTypes: string[], decimals: number[]) => {
  const wallet = useInjWallet();
  const {
    data: balances,
    refetch: refetchBalances,
    isLoading: loadingBalances,
  } = useQuery({
    queryKey: ["getBalances", coinTypes, decimals, wallet.address],
    queryFn: () => getBalances(wallet.address || "", coinTypes, decimals),
    enabled: !!wallet.connected && !!wallet.address,
  });
  return {
    balances,
    refetchBalances,
    loadingBalances,
  };
};

export default useTankReserve;
