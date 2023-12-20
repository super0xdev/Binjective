export const getBalance = async (
  address: string,
  coinType: string,
  decimals?: number
): Promise<number> => {
  if (!address) return 0;
  if (!coinType) return 0;

  return 0;
};
