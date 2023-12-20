import { CoinPrice } from "types";
import { MARKET_COINS } from "../constants";

const acceptedCoins = MARKET_COINS.map((coin) => coin.symbolToFetchPrice);

const sybmolsToFetch = acceptedCoins
  .filter((coin) => coin !== "USDT" && coin !== "USDC")
  .map((coin) => {
    return `${coin}USDT`;
  });
export const getPrices = async () => {
  const fetchArray = sybmolsToFetch.map(
    (symbol) =>
      fetch(
        `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
      ).then((res) => res.json()) as Promise<CoinPrice>
  );

  const response = await Promise.all(fetchArray);

  const result = response.map((coin) => {
    const symbol = coin.symbol.replace("USDT", "");
    return { symbol, price: coin.price };
  });

  return result.concat([{ symbol: "USDT", price: "1" }], {
    symbol: "USDC",
    price: "1",
  });
};
