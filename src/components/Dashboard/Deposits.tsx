import Image, { type StaticImageData } from "next/image";
import React, { useState } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { motion } from "framer-motion";
import WithdrawModal from "~/components/Modals/WithdrawModal";
import Link from "next/link";
import InfoPopover from "../Layout/InfoPopover";
import useBottleInfo from "~/lib/hooks/useBottleInfo";

type DepositCoins = {
  name: string;
  symbol: string;
  coinType: string;
  image: StaticImageData;
  balance: number;
  collateral: boolean;
};

const Deposits = () => {
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);
  const [, setShowCreateBottleModal] = useState<boolean>(false);
  const [selectedToWithdraw, setSelectedToWithdraw] = useState<string>("");
  const handleShowWithdrawModal = (coinName: string) => {
    setShowWithdrawModal(true);
    setSelectedToWithdraw(coinName);
  };
  const handleShowCreateBottleModal = () => {
    setShowCreateBottleModal(true);
  };

  const { bottleInfo } = useBottleInfo("INJ");

  const DepositCoins: DepositCoins[] = [];
  return (
    <div className="rounded-xl bg-white pr-[2px] pb-2">
      <div className="ml-[-4px] mt-[-4px] h-auto w-full rounded-lg border bg-black">
        {showWithdrawModal ? (
          <WithdrawModal
            setShowWithdrawModal={setShowWithdrawModal}
            coinSymbol={selectedToWithdraw}
          />
        ) : null}
        {/* {showCreateBottleModal ? (
          <CreateBottleModal
            setShowCreateBottleModal={setShowCreateBottleModal}
          />
        ) : null} */}
        <div className="p-4 pb-8">
          <div className="text-2xl font-bold">Your Deposits</div>
          <div className="grid grid-cols-2 space-x-2 pt-6 sm:flex">
            <div className="rounded-md border px-2 py-2">
              <div className="flex items-center text-center text-xs sm:text-sm">
                {bottleInfo
                  ? `Balance $${
                      (bottleInfo.collateralAmount * 10000) / 1000000000
                    }`
                  : "Balance $0"}
              </div>
            </div>
            <div className="flex items-center justify-center rounded-md border px-2 py-2 sm:mt-0">
              <InfoPopover
                title="Collateral"
                description="Allows you to decide whether to use a supplied asset as
                      collateral. An asset used as collateral will affect your
                      borrowing power and health factor."
                textSize="text-xs sm:text-sm"
              />
            </div>
          </div>
          {DepositCoins.length > 0 ? (
            <>
              <div className="hidden pt-6 text-center text-xs md:grid md:grid-cols-4 2xl:grid-cols-5">
                <div className="">Assets</div>
                <div>Balance</div>

                <InfoPopover
                  title="Collateral"
                  description="Allows you to decide whether to use a supplied asset as
                      collateral. An asset used as collateral will affect your
                      borrowing power and health factor."
                />
              </div>
              <div>
                {DepositCoins.map((DepositCoin, index) => (
                  <div
                    key={index}
                    className="grid items-center space-y-2 pt-10 md:grid-cols-4 md:space-y-0 2xl:grid-cols-5"
                  >
                    <div className="flex items-center justify-start space-x-2">
                      <div>
                        <Image
                          src={DepositCoin.image}
                          alt={`${DepositCoin.name} Logo`}
                          height={40}
                          width={40}
                          className="h-auto w-auto rounded-full md:hidden"
                          priority
                        />
                        <Image
                          src={DepositCoin.image}
                          alt={`${DepositCoin.name} Logo`}
                          height={30}
                          width={30}
                          className="hidden h-auto w-auto rounded-full md:flex"
                          priority
                        />
                      </div>
                      <div className="">
                        <div className="font-bold">{DepositCoin.symbol}</div>
                        <div className="text-gray-400 text-xs">
                          {DepositCoin.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 md:justify-center md:pt-0">
                      <div className="md:hidden">Deposit balance</div>
                      <div className="text-center">
                        <div>{DepositCoin.balance.toLocaleString("en")}</div>
                        <div className="text-sm">
                          <span className="text-gray-400">$</span>
                          {(DepositCoin.balance * 10).toLocaleString("en")}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4 md:justify-center md:pt-0">
                      <div className="md:hidden">Use as callateral</div>
                      <div className="">
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            value=""
                            className="peer sr-only focus:outline-none"
                          />
                          <div className="border-gray-600 bg-gray-700 after:border-gray-300 peer h-6 w-11 rounded-full after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-center space-x-2 pt-8 md:col-span-1 md:flex-col md:justify-center md:space-y-1 md:space-x-0 md:pt-4 2xl:col-span-2 2xl:mt-[-4px] 2xl:flex-row 2xl:space-y-0 2xl:space-x-2 2xl:pt-0">
                      <div>
                        <motion.button
                          className="action-button"
                          onClick={(_e) =>
                            handleShowWithdrawModal(DepositCoin.symbol)
                          }
                        >
                          Withdraw
                        </motion.button>
                      </div>
                      <div>
                        <motion.button className="action-button">
                          Swap
                        </motion.button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex w-full flex-col items-center justify-center pt-10">
              <motion.button
                onClick={(_e) => handleShowCreateBottleModal()}
                className="action-button-big"
              >
                <span className="animate-pulse">Create Position</span>
              </motion.button>
              <button className="mt-4 ml-2 text-[#059fe7]">
                <Link
                  href={
                    "https://docs.bucketprotocol.io/about/mechanics/borrowing#what-is-a-bottle"
                  }
                  target={"_blank"}
                >
                  <div className="flex items-center space-x-2 text-sm">
                    <div>Read More</div>
                    <HiOutlineExternalLink />
                  </div>
                </Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Deposits;
