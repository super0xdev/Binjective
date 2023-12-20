import {
  MsgExecuteContractCompat,
  fromBase64,
  getInjectiveAddress,
  toBase64,
} from "@injectivelabs/sdk-ts";
import React, { createContext, useContext, useEffect, useState } from "react";
import useInjWallet from "~/lib/hooks/useInjWallet";
import { COUNTER_CONTRACT_ADDRESS } from "~/services/constants";
import { chainGrpcWasmApi, msgBroadcastClient } from "~/services/services";

enum Status {
  Idle = "idle",
  Loading = "loading",
}

type StoreState = {
  count: number;
  isLoading: boolean;
  incrementCount: () => void;
  setContractCounter: (number: string) => void;
};

const CounterContext = createContext<StoreState>({
  count: 0,
  isLoading: true,
  incrementCount: () => {},
  setContractCounter: (number) => {},
});

export const useCounterStore = () => useContext(CounterContext);

type Props = {
  children?: React.ReactNode;
};

const CounterContextProvider = (props: Props) => {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState<Status>(Status.Idle);
  const isLoading = status == Status.Loading;
  const { address, addressWithKey } = useInjWallet();

  useEffect(() => {
    fetchCount();
  }, []);

  async function fetchCount() {
    try {
      const response = (await chainGrpcWasmApi.fetchSmartContractState(
        COUNTER_CONTRACT_ADDRESS,
        toBase64({ get_count: {} })
      )) as unknown as { data: string };

      const { count } = fromBase64(response.data) as { count: number };
      setCount(count);
    } catch (e) {
      alert((e as any).message);
    }
  }

  async function incrementCount() {
    if (!address) {
      alert("No Wallet Connected");
      return;
    }

    setStatus(Status.Loading);

    try {
      const msg = MsgExecuteContractCompat.fromJSON({
        contractAddress: COUNTER_CONTRACT_ADDRESS,
        sender: address,
        msg: {
          increment: {},
        },
      });

      await msgBroadcastClient.broadcast({
        msgs: msg,
        injectiveAddress: address,
      });
      fetchCount();
    } catch (e) {
      alert((e as any).message);
    } finally {
      setStatus(Status.Idle);
    }
  }

  async function setContractCounter(number: string) {
    if (!address) {
      alert("No Wallet Connected");
      return;
    }

    if (Number(number) > 100 || Number(number) < -100) {
      alert("Number must we within -100 and 100");
      return;
    }

    setStatus(Status.Loading);

    try {
      const msg = MsgExecuteContractCompat.fromJSON({
        contractAddress: COUNTER_CONTRACT_ADDRESS,
        sender: address,
        msg: {
          reset: {
            count: parseInt(number, 10),
          },
        },
      });

      await msgBroadcastClient.broadcast({
        msgs: msg,
        injectiveAddress: address,
      });

      fetchCount();
    } catch (e) {
      alert((e as any).message);
    } finally {
      setStatus(Status.Idle);
    }
  }

  return (
    <CounterContext.Provider
      value={{
        count,
        isLoading,
        incrementCount,
        setContractCounter,
      }}
    >
      {props.children}
    </CounterContext.Provider>
  );
};

export default CounterContextProvider;
