export const getBalances = async (
  address: string,
  coinTypes: string[],
  decimals: number[]
) => {
  if (!address) return;
  if (!coinTypes) return;
  if (!decimals) return;
  const balances: number[] = [];
  // for (let i = 0; i < coinTypes.length; i++) {
  //   const balance = await provider
  //     .getBalance({ owner: address, coinType: coinTypes[i] })
  //     .then((res) => res.totalBalance);
  //   balances.push(Number(balance) / 10 ** (decimals[i] ?? 0));
  // }
  return balances;
};
