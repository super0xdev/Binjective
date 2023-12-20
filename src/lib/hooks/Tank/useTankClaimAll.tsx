import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { MARKET_COINS_TYPE_LIST } from "../../utils/constants";
import { GAS_BUDGET } from "../../utils/inj/constants";

const useTankClaimAll = () => {
  const claimAll = async () => {};

  const {
    mutate: executeClaimAll,
    isLoading: loadingClaimAll,
    isError: errorClaimAll,
    isSuccess: successClaimAll,
  } = useMutation({
    mutationKey: ["claimAll"],
    mutationFn: () => claimAll(),
  });

  return {
    claimAll,
    executeClaimAll,
    loadingClaimAll,
    errorClaimAll,
    successClaimAll,
  };
};

export default useTankClaimAll;
