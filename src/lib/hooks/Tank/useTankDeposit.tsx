import { COIN_TYPE } from "../../utils/inj/constants";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Link from "next/link";

const { BUCK } = COIN_TYPE;

const useTankDeposit = (tankType: string, depositAmount: number) => {
  const deposit = async (tankType: string, depositAmount: number) => {};

  const {
    mutate: executeDeposit,
    isLoading: loadingDeposit,
    isError: errorDeposit,
    isSuccess: successDeposit,
  } = useMutation({
    mutationKey: ["deposit", tankType, depositAmount],
    mutationFn: () => deposit(tankType, depositAmount),
  });
  return {
    deposit,
    executeDeposit,
    loadingDeposit,
    errorDeposit,
    successDeposit,
  };
};

export default useTankDeposit;
