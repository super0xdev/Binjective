type TankResponseResult = {
  reserve: string;
  collateral_pool: string;
  current_s: string;
  current_p: string;
};

type TankInfo = {
  buckReserve: string;
  collateralPool: string;
  currentS: string;
  currentP: string;
};

export const getTankInfo = async (objectId: string) => {
  try {
    const tankInfo: TankInfo = {
      buckReserve: "0",
      collateralPool: "0",
      currentS: "0",
      currentP: "1",
    };
    return tankInfo;
  } catch (error) {
    return undefined;
  }
};
