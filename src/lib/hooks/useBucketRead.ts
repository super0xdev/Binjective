/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { DynamicFieldInput } from "types";
import humps from "lodash-humps-ts";
import { useQuery } from "@tanstack/react-query";
import type { CamelCasedPropertiesDeep } from "type-fest";

export type BucketDataType = CamelCasedPropertiesDeep<BucketTypeInfo>;

type BucketTypeInfo = {
  base_rate_fee: string;
  bottle_table: {
    type: string;
    fields: {
      debt_per_unit_stake: string;
      id: {
        id: string;
      };
      reward_per_unit_stake: string;
      table: {
        type: string;
        fields: {
          head: string;
          id: {
            id: string;
          };
          size: string;
          tail: string;
        };
      };
      total_collateral_snapshot: string;
      total_stake: string;
      total_stake_snapshot: string;
    };
  };
  collateral_decimal: number;
  collateral_vault: string;
  id: {
    id: string;
  };
  latest_redemption_time: string;
  min_collateral_ratio: string;
  minted_buck_amount: string;
  recovery_mode_threshold: string;
  total_flash_loan_amount: string;
};

const getBucketInfo = async (input: Array<DynamicFieldInput | null>) => {
  const result = {};
  return result as BucketDataType[];
};

const useBucketRead = (
  bucketInput: Array<DynamicFieldInput | null>,
  refetchSec: number
) => {
  const {
    data,
    refetch: refetchBucketInfo,
    isLoading: loadingBucketInfo,
  } = useQuery({
    queryKey: ["getBucketInfo"],
    queryFn: () => getBucketInfo(bucketInput),
    refetchInterval: refetchSec * 1000,
    refetchIntervalInBackground: true,
    // enabled: !!connected && !!address,
  });
  return {
    bucketInfo: data === undefined ? [] : data,
    refetchBucketInfo,
    loadingBucketInfo,
  };
};

export default useBucketRead;
