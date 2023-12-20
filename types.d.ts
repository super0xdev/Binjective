import type { StaticImageData } from "next/image";

export type NavItem = {
  name: string;
  url: string;
};

export type TokenDepositInfo = {
  tokenName: string;
  depositBalance: number;
};

export type Target = `${string}::${string}::${string}`;

export type Coin = {
  version: string;
  digest: string;
  coinType: string;
  previousTransaction: string;
  coinObjectId: string;
  balance: string;
  lockedUntilEpoch?: number | null | undefined;
};

export type ContributorToken = {
  data: {
    digest: string;
    objectId: string;
    version: string;
  };
};

export type MarketCoin = {
  name: string;
  symbol: string;
  symbolToFetchPrice: string;
  coinType: string;
  image: StaticImageData | string;
  decimal: number;
};

export type DepositCoins = {
  name: string;
  symbol: string;
  coinType: string;
  image: StaticImageData | string;
  balance: number;
  totalDeposited: number;
  coinPrice: number;
  collateralRatio: number;
};

export type AvailableCoin = {
  name: string;
  symbol: string;
  coinType: string;
  image: StaticImageData;
  decimal: number;
};

export type DynamicFieldName = {
  type: string;
  value?: object;
};

export type DynamicFieldInput = {
  parentId: string;
  name: DynamicFieldName;
};

export type BucketTypeInfo = {
  base_fee_rate: string;
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
  min_bottle_size: string;
  recovery_mode_threshold: string;
  total_flash_loan_amount: string;
};

export type CoinPrice = {
  symbol: string;
  price: string;
};
