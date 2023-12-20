import React, { PropsWithChildren } from "react";
import { type CoinPrice, type MarketCoin } from "types";
import { useTicker } from "~/lib/hooks/pricefeed/useTicker";

export type MarketCoinAllInfo = MarketCoin & {
  totalDeposited: number;
  totalBuckMinted: number;
  minCR: string;
  price: number;
};

type ProtocolContextProps = {
  cryptosPriceData: CoinPrice[];
  loadingPrice: boolean;
  refetchCryptosPrices: () => void;
};

export const ProtocolContext = React.createContext<ProtocolContextProps>({
  cryptosPriceData: [],
  loadingPrice: false,
  refetchCryptosPrices: () => {},
});

export const ProtocolProvider = (props: PropsWithChildren) => {
  const { cryptosPriceData, loadingPrice, refetchCryptosPrices } = useTicker();

  return (
    <>
      <ProtocolContext.Provider
        value={{
          cryptosPriceData: cryptosPriceData as CoinPrice[],
          loadingPrice,
          refetchCryptosPrices,
        }}
      >
        {props.children}
      </ProtocolContext.Provider>
    </>
  );
};
