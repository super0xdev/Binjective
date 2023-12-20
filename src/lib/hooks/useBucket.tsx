const useBucket = (coinSymbol: string) => {
  const borrow = async () => {
    console.log(coinSymbol);
  };
  const repay = async () => {};
  const deposit = async () => {};
  const redeem = async () => {};

  return { borrow, repay, deposit, redeem };
};

export default useBucket;
