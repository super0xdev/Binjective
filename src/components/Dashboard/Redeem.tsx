import React from "react";
import Image, { type StaticImageData } from "next/image";
import BuckLogo from "../../../public/buck-icon.png";
import { motion } from "framer-motion";
import RedeemModal from "../Modals/RedeemModal";
import InfoPopover from "../Layout/InfoPopover";
import useBottleInfo from "~/lib/hooks/useBottleInfo";
import useBalances from "~/lib/hooks/useBalances";
import { COIN_TYPE } from "~/lib/utils/inj/constants";
import useDisclosure from "~/lib/hooks/useDisclosure";
import DataColumn from "./DataColumn";
import useInjWallet from "~/lib/hooks/useInjWallet";

type RedeemCoins = {
  name: string;
  symbol: string;
  image: StaticImageData;
  balance: number;
  borrowFee: number;
};

const Redeem = ({ coinType }: { coinType: string }) => {
  const { connected } = useInjWallet();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { balances } = useBalances([COIN_TYPE.BUCK], [9]);
  const { bottleInfo } = useBottleInfo(coinType);

  const borrowBuckAmount = Number(
    ((bottleInfo && bottleInfo.buckAmount) || 0) / 10 ** 9
  );

  const redeemCoins: RedeemCoins[] = [
    {
      name: "Bucket USD",
      symbol: "BUCK",
      image: BuckLogo,
      balance: borrowBuckAmount,
      borrowFee: 0.3,
    },
  ];

  return (
    <div className="mx-0 rounded-xl bg-white text-black">
      <div className="h-auto w-full rounded-lg px-8 lg:px-[100px]">
        <div className="text-2xl font-bold">Redeem</div>
        <div className="hidden items-center pt-6 text-center text-xs md:grid md:grid-cols-4 2xl:grid-cols-5">
          <div className="text-left">Assets</div>
          <div>Wallet Balance</div>
          <InfoPopover
            title="Redemption Fee"
            description="The is a one-time fee charged for redeeming $BUCK."
          />
        </div>
        {redeemCoins.map((redeemCoin, index) => (
          <div
            key={index}
            className="grid items-center space-y-2 pt-4 md:grid-cols-4 md:space-y-0 2xl:grid-cols-5"
          >
            <div className="flex items-center justify-start space-x-2">
              <Image
                src={redeemCoin.image}
                alt={`${redeemCoin.name} Logo`}
                height={40}
                width={40}
                className="h-10 w-10 rounded-full"
                priority
              />
              <div className="pl-2">
                <div className="font-bold">{redeemCoin.name}</div>
                <div className="text-gray-400 text-xs">{redeemCoin.symbol}</div>
              </div>
            </div>

            <DataColumn
              title="Wallet Balance"
              value={(balances && balances[0]) || 0}
            />

            <DataColumn
              title="Redemption Fee"
              value={`${redeemCoin.borrowFee}%`}
            />

            <div className="flex items-end justify-center space-x-2 pt-8 md:flex-col md:justify-center md:space-y-1 md:space-x-0 md:pt-4 2xl:col-span-2 2xl:mt-[-4px] 2xl:flex-row 2xl:space-y-0 2xl:space-x-2 2xl:pt-0">
              <div>
                <motion.button
                  className={`${
                    connected ? "action-button" : "disabled-action-button"
                  }`}
                  disabled={!connected}
                  onClick={onOpen}
                >
                  Redeem
                </motion.button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <RedeemModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        coinSymbol="INJ"
      />
    </div>
  );
};

export default Redeem;
