export type BucketResponseResult = {
  baseFeeRate: string;
  bottleTableSize: string;
  collateralDecimal: number;
  collateralVault: string;
  latestRedemptionTime: string;
  minCollateralRatio: string;
  mintedBuckAmount: string;
  minBottleSize: string;
  recoveryModeThreshold: string;
};

export type BucketList = {
  [key: string]: BucketResponseResult;
};

export const getMultiBucketInfo = async () => {
  const bucketList: BucketList = {};
  return bucketList;
};
