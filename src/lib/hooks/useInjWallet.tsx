import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { WalletContext } from "~/context/WalletProvider";

const useInjWallet = () => {
  const { wallets, connected, address, connect, disconnect, addressWithKey } =
    useContext(WalletContext);

  return {
    wallets,
    connected,
    address,
    connect,
    disconnect,
    addressWithKey,
  };
};

export default useInjWallet;
