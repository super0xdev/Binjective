import { IndexerGrpcOracleApi } from "@injectivelabs/sdk-ts";
import { getNetworkEndpoints, Network } from "@injectivelabs/networks";
import { ACCEPT_ASSETS } from "../constants";

const endpoints = getNetworkEndpoints(Network.Testnet);
const indexerGrpcOracleApi = new IndexerGrpcOracleApi(endpoints.indexer);

const quoteSymbol = "USDT";
const oracleType = "bandibc"; // primary oracle we use

export const oraclePrice = async (baseSymbol: ACCEPT_ASSETS) => {
  await indexerGrpcOracleApi.fetchOraclePriceNoThrow({
    baseSymbol,
    quoteSymbol,
    oracleType,
  });
};
