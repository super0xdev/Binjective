import { toast } from "react-toastify";
import { getBorrowTx } from "../../utils/inj/tx/getBorrowTx";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import useInjWallet from "../useInjWallet";
import {
  MsgExecuteContractCompat,
  fromBase64,
  getInjectiveAddress,
  toBase64,
} from "@injectivelabs/sdk-ts";
import { chainGrpcWasmApi, msgBroadcastClient } from "~/services/services";
import { useState } from "react";

const CONTRACT_ADDRESS = "";

const useBorrow = (
  coinType: string,
  collateralAmount: number,
  borrowAmount: number
) => {
  const { address } = useInjWallet();
  const [count, setCount] = useState(0);

  async function fetchCount() {
    try {
      const response = (await chainGrpcWasmApi.fetchSmartContractState(
        CONTRACT_ADDRESS,
        toBase64({ get_count: {} })
      )) as unknown as { data: string };

      const { count } = fromBase64(response.data) as { count: number };
      setCount(count);
    } catch (e) {
      alert((e as any).message);
    }
  }

  const borrow = async (
    coinType: string,
    collateralAmount: number,
    borrowAmount: number
  ) => {
    if (!address) {
      alert("No Wallet Connected");
      return;
    }

    try {
      const msg = MsgExecuteContractCompat.fromJSON({
        contractAddress: CONTRACT_ADDRESS,
        sender: address,
        msg: {
          increment: {},
        },
      });

      // Signing and broadcasting the message

      await msgBroadcastClient.broadcast({
        msgs: msg,
        injectiveAddress: address,
      });
      fetchCount();
    } catch (e) {
      alert((e as any).message);
    }
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
