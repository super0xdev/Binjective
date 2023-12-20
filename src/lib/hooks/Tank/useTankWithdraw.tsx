import { toast } from "react-toastify";
import type { ContributorToken } from "types";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { COIN_TYPE, CONTRIBUTOR_TOKEN_ID } from "~/lib/utils/inj/constants";

const { BUCK } = COIN_TYPE;

const tankTypeToContributorTokenType = (tankType: string) => {
  return `${CONTRIBUTOR_TOKEN_ID}::tank::ContributorToken<${BUCK}, ${tankType}>`;
};

const useTankWithdraw = (
  tankName: string,
  tankType: string,
  withdrawAmount: number
) => {
  const withdraw = async (
    tankName: string,
    tankType: string,
    withdrawAmount: number
  ) => {};

  const {
    mutate: executeWithdraw,
    isLoading: loadingWithdraw,
    isError: errorWithdraw,
    isSuccess: successWithdraw,
  } = useMutation({
    mutationKey: ["withdraw", tankName, tankType],
    mutationFn: () => withdraw(tankName, tankType, withdrawAmount),
  });
  return {
    withdraw,
    executeWithdraw,
    loadingWithdraw,
    errorWithdraw,
    successWithdraw,
  };
};

export default useTankWithdraw;
