import React, { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import InfoPopover from "../Layout/InfoPopover";

type Bottles = {
  name: string;
  symbol: string;
  image: StaticImageData;
  borrowFee: number;
  debt: number;
  depositAmount: number;
};

const Borrows = () => {
  const [, setShowBorrowModal] = useState<boolean>(false);
  const [, setSelectedToBorrow] = useState<string>("");
  const handleShowBorrowModal = (coinName: string) => {
    setShowBorrowModal(true);
    setSelectedToBorrow(coinName);
  };
  const bottles: Bottles[] = [
    // {
    //   name: "Bucket USD",
    //   symbol: "BUCK",
    //   borrowFee: 0.5,
    //   debt: 10000,
    //   depositAmount: 100000,
    // },
  ];
  return (
    <div className="rounded-xl bg-white pr-[2px] pb-2">
      <div className="ml-[-4px] mt-[-4px] h-auto w-full rounded-lg border bg-black">
        <div className="p-4 pb-6">
          <div className="text-2xl font-bold">Your Borrows</div>
          {/* {showBorrowModal ? (
            <BorrowModal
              setShowBorrowModal={setShowBorrowModal}
              coinSymbol={selectedToBorrow}
            />
          ) : null} */}
          <div className="grid grid-cols-2 pt-6 text-center sm:flex sm:space-x-3">
            <div className="rounded-md border px-2 py-2">
              <div className="text-center text-xs sm:text-sm">
                Borrowed $10000
              </div>
            </div>
            <div className="flex items-center justify-center rounded-md border px-2 py-2 sm:mt-0">
              <InfoPopover
                title="Collateral Ratio"
                description="The % of your total borrowing power used. This is based on the
                  amount of your collateral supplied and the total amount that
                  you can borrow."
                textSize="text-xs sm:text-sm"
              />
            </div>
          </div>
          {bottles.length > 0 ? (
            <>
              <div className="hidden pt-6 text-center text-xs md:grid md:grid-cols-4 2xl:grid-cols-5">
                <div className="">Assets</div>
                <div>Debt</div> <div>Borrow Fee</div>
              </div>
              {bottles.map((bottle, index) => (
                <div
                  key={index}
                  className="grid items-center space-y-2 pt-10 md:grid-cols-4 md:space-y-0 2xl:grid-cols-5"
                >
                  <div className="flex items-center justify-start space-x-2 xl:justify-start">
                    <Image
                      src={bottle.image}
                      alt={`${bottle.name} Logo`}
                      height={40}
                      width={40}
                      className="h-auto w-auto rounded-full md:hidden"
                      priority
                    />
                    <Image
                      src={bottle.image}
                      alt={`${bottle.name} Logo`}
                      height={30}
                      width={30}
                      className="hidden h-auto w-auto rounded-full md:flex"
                      priority
                    />
                    <div>
                      <div className="font-bold">{bottle.name}</div>
                      <div className="text-gray-400 text-xs">
                        {bottle.symbol}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 md:justify-center md:pt-0">
                    <div className="md:hidden">Debt</div>
                    <div></div>
                    <div className="text-center">
                      <div>{bottle.debt.toLocaleString("en")}</div>
                      <div className="text-sm">
                        <span className="text-gray-400">$</span>
                        {(bottle.debt * 10).toLocaleString("en")}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between pt-4 md:justify-center md:pt-0">
                    <div className="md:hidden">Borrow Fee</div>
                    <div className="">
                      {bottle.borrowFee}{" "}
                      <span className="text-gray-400">%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-2 pt-8 md:col-span-4 md:justify-center md:pt-4 xl:mt-[-4px] xl:pr-2 2xl:col-span-2 2xl:pt-0">
                    <div>
                      <motion.button className="action-button">
                        Repay
                      </motion.button>
                    </div>
                    <div>
                      <motion.button
                        className="action-button"
                        onClick={(_e) => handleShowBorrowModal(bottle.symbol)}
                      >
                        Borrow
                      </motion.button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Borrows;
