import { useQuery } from "@tanstack/react-query";
import { getPrices } from "~/lib/utils/priceFeed/getPrices";

const useTicker = () => {
  const {
    data: cryptosPriceData,
    refetch: refetchCryptosPrices,
    isLoading: loadingPrice,
  } = useQuery({
    queryKey: ["getPrices"],
    queryFn: () => getPrices(),
    refetchInterval: 10 * 1000,
  });

  return { cryptosPriceData, refetchCryptosPrices, loadingPrice };
};

export { useTicker };
