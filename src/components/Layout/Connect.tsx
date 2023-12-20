import Image from "next/image";
import { useEffect } from "react";
import { type UseDisclosureProps } from "~/lib/hooks/useDisclosure";
import useInjWallet from "~/lib/hooks/useInjWallet";
import { motion } from "framer-motion";

type ConnectProps = UseDisclosureProps;

const Connect = (props: ConnectProps) => {
  const { onClose } = props;
  const { wallets, connect, connected } = useInjWallet();

  useEffect(() => {
    if (connected) {
      onClose?.();
    }
  }, [connected]);

  return (
    <div
      className={`flex w-110 flex-col gap-4 bg-gradient-to-br from-blue-400 to-blue-400 px-16 py-10 text-white`}
    >
      <button className="flex w-full items-center justify-center text-3xl font-semibold hover:cursor-default">
        Connect Wallet
      </button>
      <ul>
        {wallets.map((wallet) => (
          <li key={wallet.name}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="my-2 flex h-[3rem] w-full items-center justify-between rounded-lg bg-white pl-4 text-black"
              onClick={() => {
                connect({ wallet });
              }}
            >
              <div className="font-medium">
                {wallet.icon ? (
                  <Image
                    src={wallet.icon}
                    alt={`${wallet.name} icon`}
                    className="mr-2 inline-block"
                    width={24}
                    height={24}
                  />
                ) : null}
                {wallet.name}
              </div>
              <div className="pr-4">
                {wallet.installed ? "" : "uninstalled"}
              </div>
            </motion.button>
          </li>
        ))}
      </ul>
      <button
        className="h-[2.5rem] rounded-lg bg-white font-medium text-black hover:cursor-pointer"
        onClick={() => onClose?.()}
      >
        Close
      </button>
    </div>
  );
};

export default Connect;
