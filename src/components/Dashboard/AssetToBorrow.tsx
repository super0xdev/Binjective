//Not use it now
import Image, { type StaticImageData } from "next/image";
import React, { useState } from "react";
import BuckLogo from "../../../public/buck-icon.png";
import { motion } from "framer-motion";
import BorrowModal from "../Modals/BorrowModal";
import RepayModal from "../Modals/RepayModal";
import InfoPopover from "../Layout/InfoPopover";
import useBottleInfo from "~/lib/hooks/useBottleInfo";
import useDisclosure from "~/lib/hooks/useDisclosure";
import { COIN_TYPE } from "~/lib/utils/inj/constants";

type BorrowCoins = {
  name: string;
  symbol: string;
  image: StaticImageData;
  balance: number;
  borrowFee: number;
};

const AssetToBorrow = () => {
  const {
    isOpen: isOpenBorrowModal,
    onOpen: onOpenBorrowModal,
    onClose: onCloseBorrowModal,
  } = useDisclosure();
  const {
    isOpen: isOpenRepayModal,
    onOpen: onOpenRepayModal,
    onClose: onCloseRepayModal,
  } = useDisclosure();

  const [coinSymbol, setCoinSymbol] = useState("");

  const { bottleInfo } = useBottleInfo(COIN_TYPE.INJ);
  const borrowBuckAmount = Number(
    ((bottleInfo && bottleInfo.buckAmount) || 0) / 10 ** 9
  );
  const borrowCoins: BorrowCoins[] = [
    {
      name: "Bucket USD",
      symbol: "BUCK",
      image: BuckLogo,
      balance: borrowBuckAmount,
      borrowFee: 0.5,
    },
  ];
  return (
    <div className="mx-0 rounded-xl bg-white pr-[2px] pb-2 lg:mx-8">
      <div className="ml-[-4px] mt-[-4px] h-auto w-full rounded-lg border bg-black">
        <div className="p-4 pb-6">
          <div className="text-2xl font-bold">Total Borrow</div>
          <div className="hidden items-center pt-6 text-center text-xs md:grid md:grid-cols-4 2xl:grid-cols-5">
            <div className="">Asset</div>
            <InfoPopover
              title="Borrowed"
              description="This is the $BUCK amount you've borrowed"
            />
            <InfoPopover
              title="Borrow Fee"
              description="The is a one-time fee charged for borrowing $BUCK."
            />
          </div>
          {borrowCoins.map((borrowCoin, index) => (
            <div
              key={index}
              className="grid items-center space-y-2 pt-10 md:grid-cols-4 md:space-y-0 2xl:grid-cols-5"
            >
              <div className="flex items-center justify-start space-x-2">
                <Image
                  src={borrowCoin.image}
                  alt={`${borrowCoin.name} Logo`}
                  height={40}
                  width={40}
                  className="h-auto w-auto rounded-full md:hidden"
                  priority
                />
                <Image
                  src={borrowCoin.image}
                  alt={`${borrowCoin.name} Logo`}
                  height={30}
                  width={30}
                  className="hidden h-auto w-auto rounded-full md:flex"
                  priority
                />
                <div>
                  <div className="font-bold">{borrowCoin.name}</div>
                  <div className="text-gray-400 text-xs">
                    {borrowCoin.symbol}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 md:justify-center md:pt-0">
                <div className="md:hidden">Borrowed</div>
                <div className="text-center">
                  <div>{borrowCoin.balance.toLocaleString("en")}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 md:justify-center md:pt-0">
                <div className="md:hidden">Borrow Fee</div>
                <div>{borrowCoin.borrowFee}%</div>
              </div>

              <div className="flex items-center justify-center space-x-2 pt-8 md:flex-col md:justify-center md:space-y-1 md:space-x-0 md:pt-4 2xl:col-span-2 2xl:mt-[-4px] 2xl:flex-row 2xl:space-y-0 2xl:space-x-2 2xl:pt-0">
                <motion.button
                  className="action-button"
                  onClick={() => {
                    setCoinSymbol("BUCK");
                    onOpenBorrowModal();
                  }}
                >
                  Borrow
                </motion.button>
                <motion.button
                  className="action-button"
                  onClick={onOpenRepayModal}
                >
                  Repay
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BorrowModal
        coinSymbol={coinSymbol}
        isOpen={isOpenBorrowModal}
        onOpen={onOpenBorrowModal}
        onClose={onCloseBorrowModal}
      />
      <RepayModal
        isOpen={isOpenRepayModal}
        onOpen={onOpenRepayModal}
        onClose={onCloseRepayModal}
      />
    </div>
  );
};

export default AssetToBorrow;
