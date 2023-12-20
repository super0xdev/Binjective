import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { COIN_TYPE } from "~/lib/utils/inj/constants";
import useInjWallet from "../useInjWallet";

const useRepay = (
  coinSymbol: string,
  repayAmount: number,
  withdrawAmount: number
) => {
  const { address } = useInjWallet();

  const repay = async () => {
    try {
      if (!address) return;
    } catch (err) {}
  };
  const {
    mutate: executeRepay,
    isLoading: loadingRepay,
    isError: errorRepay,
    isSuccess: successRepay,
  } = useMutation({
    mutationKey: ["repay"],
    mutationFn: () => repay(),
  });
  return {
    repay,
    executeRepay,
    loadingRepay,
    errorRepay,
    successRepay,
  };
};

export default useRepay;
