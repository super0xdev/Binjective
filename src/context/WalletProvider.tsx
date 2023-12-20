import {
  type PropsWithChildren,
  useEffect,
  useState,
  createContext,
} from "react";
import { getInjectiveAddress } from "@injectivelabs/sdk-ts";
import { ChainId } from "@injectivelabs/ts-types";

type Wallet = {
  name: string;
  icon: string;
  installed: boolean;
};

type KeplrAccount = {
  address: string;
  algo: string;
  pubkey: string;
};

let wallets: Wallet[] = [
  {
    name: "Metamask",
    icon: "/metamask.png",
    installed: false,
  },
  {
    name: "Keplr",
    icon: "/keplr.png",
    installed: false,
  },
];

export type WalletProps = {
  connected: boolean;
  address: string;
  addressWithKey: KeplrAccount;
  wallets: Wallet[];
  connect: ({ wallet }: { wallet: Wallet }) => void;
  disconnect: () => void;
};

export const WalletContext = createContext<WalletProps>({
  connected: false,
  address: "",
  addressWithKey: {
    address: "",
    algo: "",
    pubkey: "",
  },
  wallets: [],
  connect: () => {},
  disconnect: () => {},
});

export const WalletProvider = (props: PropsWithChildren) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [addressWithKey, setAddressWithKey] = useState<KeplrAccount>();
  if (typeof window === "undefined") return <>{props.children}</>;

  const lastConnectedWallet = localStorage.getItem("last-connected-wallet");

  const getEthereum = () => {
    if (!(window as any).ethereum) {
      return;
    }

    return (window as any).ethereum;
  };

  const getKeplr = () => {
    if (!(window as any).keplr) {
      return;
    }

    return (window as any).keplr;
  };

  const connect = async ({ wallet }: { wallet: Wallet }) => {
    if (wallet.name === "Metamask") {
      if (wallet.installed === false) {
        window.open("https://metamask.io/download/", "_blank");
        return;
      }
      const ethereum = getEthereum();
      const addresses = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const injectiveAddresses = addresses.map(getInjectiveAddress);
      setAddress(injectiveAddresses[0]);
      localStorage.setItem("last-connected-wallet", "MetaMask");
      setConnected(true);
    }
    if (wallet.name === "Keplr") {
      if (wallet.installed === false) {
        window.open("https://www.keplr.app/download", "_blank");
        return;
      }
      const keplr = getKeplr();
      const chainId = ChainId.Testnet;
      await keplr.enable(chainId);
      const injectiveAddresses: KeplrAccount[] = await keplr
        .getOfflineSigner(chainId)
        .getAccounts();
      setAddressWithKey(injectiveAddresses[0]);

      setAddress(injectiveAddresses[0]?.address ?? "");
      localStorage.setItem("last-connected-wallet", "Keplr");
      setConnected(true);
    }
  };

  const disconnect = () => {
    setAddress("");
    setConnected(false);
  };

  // check if wallet is installed
  useEffect(() => {
    if (typeof window !== "undefined") {
      const ethereum = getEthereum();
      const keplr = getKeplr();
      if (ethereum) {
        wallets[0]!.installed = true;
      }
      if (keplr) {
        wallets[1]!.installed = true;
      }
    }
  }, []);

  // set Address if get lastConnectedWallet
  useEffect(() => {
    const getAddress = async () => {
      if (lastConnectedWallet === "MetaMask") {
        const ethereum = getEthereum();
        const addresses = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const injectiveAddresses = addresses.map(getInjectiveAddress);
        // todo: let user switch between addresses
        setAddress(injectiveAddresses[0]);
        setConnected(true);
      }
      if (lastConnectedWallet === "Keplr") {
        const keplr = getKeplr();
        const chainId = ChainId.Testnet;
        await keplr.enable(chainId);
        const injectiveAddresses: KeplrAccount[] = await keplr
          .getOfflineSigner(chainId)
          .getAccounts();
        setAddressWithKey(injectiveAddresses[0]);

        // todo: let user switch between addresses
        setAddress(injectiveAddresses[0]?.address ?? "");
        setConnected(true);
      }
    };
    getAddress();
  }, [lastConnectedWallet]);

  if (typeof window === "undefined") return <></>;

  return (
    <WalletContext.Provider
      value={{
        connected,
        address: address ?? "",
        addressWithKey: addressWithKey ?? {
          address: "",
          algo: "",
          pubkey: "",
        },
        wallets,
        connect,
        disconnect,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
};
