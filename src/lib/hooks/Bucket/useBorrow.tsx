import { toast } from "react-toastify";
import { getBorrowTx } from "../../utils/inj/tx/getBorrowTx";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import useInjWallet from "../useInjWallet";

const useBorrow = (
  BUCKSymbol: string,
  coinType: string,
  collateralAmount: number,
  borrowAmount: number
) => {
  const { address } = useInjWallet();

  const borrow = async (
    coinType: string,
    collateralAmount: number,
    borrowAmount: number
  ) => {
    try {
      if (!address) return;
    } catch (err) {}
  };

  const {
    mutate: executeBorrow,
    isLoading: loadingBorrow,
    isError: errorBorrow,
    isSuccess: successBorrow,
  } = useMutation({
    mutationKey: ["borrow", coinType, collateralAmount, borrowAmount],
    mutationFn: () => borrow(coinType, collateralAmount, borrowAmount),
  });

  return {
    executeBorrow,
    loadingBorrow,
    errorBorrow,
    successBorrow,
    borrow,
  };
};

export default useBorrow;
