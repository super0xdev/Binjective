import { useQuery } from "@tanstack/react-query";
import { getBalance } from "../utils/inj/balances/getBalance";
import useInjWallet from "./useInjWallet";

const useTokenBalance = (
  coinTypes: string,
  decimals: number,
  refetchSec: number
) => {
  const wallet = useInjWallet();
  const {
    data: balance,
    refetch: refetchBalance,
    isLoading: loadingBalance,
  } = useQuery({
    queryKey: ["getBalance", coinTypes, decimals, wallet.address],
    queryFn: () => getBalance(wallet.address || "", coinTypes, decimals),
    enabled: !!wallet.connected && !!wallet.address,
    refetchInterval: refetchSec * 1000,
    refetchIntervalInBackground: true,
  });
  return {
    balance,
    refetchBalance,
    loadingBalance,
  };
};

export default useTokenBalance;
