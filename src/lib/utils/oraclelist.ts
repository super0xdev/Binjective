import { IndexerGrpcOracleApi } from "@injectivelabs/sdk-ts";
import { getNetworkEndpoints, Network } from "@injectivelabs/networks";

const endpoints = getNetworkEndpoints(Network.Testnet);
const indexerGrpcOracleApi = new IndexerGrpcOracleApi(endpoints.indexer);

export const oracleList = async () => {
  const res = await indexerGrpcOracleApi.fetchOracleList();
  console.log(res);
};
