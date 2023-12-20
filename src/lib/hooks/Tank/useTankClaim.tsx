import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { GAS_BUDGET } from "../../utils/inj/constants";

const useTankClaim = (tankType: string) => {
  const claim = async () => {};

  const {
    mutate: executeClaim,
    isLoading: loadingClaim,
    isError: errorClaim,
    isSuccess: successClaim,
  } = useMutation({
    mutationKey: ["claim", tankType],
    mutationFn: () => claim(),
  });
  return {
    claim,
    executeClaim,
    loadingClaim,
    errorClaim,
    successClaim,
  };
};

export default useTankClaim;
