import type { DynamicFieldInput } from "types";

type OracleInfoResult = {
  epoch: string;
  id: {
    id: string;
  };
  latest_update_ms: string;
  precision: string;
  precision_decimal: number;
  price: string;
  pyth_config: string | null;
  supra_config: string | null;
  switchboard_config: string | null;
};

export const getOracleInfo = async (input: DynamicFieldInput) => {
  if (!input) return undefined;
  const oracleData: OracleInfoResult = {
    epoch: "0",
    id: {
      id: "",
    },
    latest_update_ms: "0",
    precision: "0",
    precision_decimal: 0,
    price: "0",
    pyth_config: null,
    supra_config: null,
    switchboard_config: null,
  };
  return oracleData;
};
