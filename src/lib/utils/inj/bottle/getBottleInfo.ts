type BottleTableMap = { [key: string]: string };

const BOTTLE_TABLE_MAP: BottleTableMap = {
  INJ: "0x43ad22af53facef608802e3f670dce51bbaea5eba55606e4d923f95bb5959478",
  "0x1::btc::BTC": "",
  "0x1::btc::ETH": "",
};

type BottleInfo = {
  collateralAmount: number;
  buckAmount: number;
};

type BottleInfoResult = {
  value: {
    fields: {
      value: {
        fields: {
          collateral_amount: number;
          buck_amount: number;
        };
      };
    };
  };
};

export const getBottleInfo = async (address: string, coinType: string) => {
  if (!address) return null;
  if (!coinType) return null;
  const parentId = BOTTLE_TABLE_MAP[coinType];
  if (!parentId) return null;
  const bottleInfo: BottleInfo = {
    collateralAmount: 0,
    buckAmount: 0,
  };
  return bottleInfo;
};
