"use client";

import Image, { type StaticImageData } from "next/image";
import React from "react";
import { AiOutlineQuestionCircle, AiOutlineMinus } from "react-icons/ai";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import InjLogo from "../../../public/inj.png";
import BuckLogo from "../../../public/buck-icon.png";
import UsdcLogo from "../../../public/usdc.png";
import { motion } from "framer-motion";
import Link from "next/link";

type MarketCoin = {
  name: string;
  symbol: string;
  image: StaticImageData;
  totalDeposited: number;
  depositAPY: number;
  totalBorrowed: number;
  borrowApyVariable: number;
  borrowApyStable: number;
};

const MarketCoins = () => {
  const MarketCoins: MarketCoin[] = [
    {
      name: "Injective",
      symbol: "INJ",
      image: InjLogo,
      totalDeposited: 10000,
      depositAPY: 100,
      totalBorrowed: 100,
      borrowApyVariable: 10,
      borrowApyStable: 20,
    },
    {
      name: "Bucket USD",
      symbol: "BUCK",
      image: BuckLogo,
      totalDeposited: 10000,
      depositAPY: 100,
      totalBorrowed: 100,
      borrowApyVariable: 10,
      borrowApyStable: 20,
    },
    {
      name: "LayerZero USDC",
      symbol: "USDC",
      image: UsdcLogo,
      totalDeposited: 10000,
      depositAPY: 10,
      totalBorrowed: 100,
      borrowApyVariable: 8,
      borrowApyStable: 12,
    },
  ];
  return (
    <div className="rounded-xl bg-white pr-[2px] pb-2">
      <div className="ml-[-4px] mt-[-4px] h-auto w-full rounded-lg border bg-black">
        <div className="p-4">
          <div className="text-2xl font-bold">Injective assets</div>
          <div className="hidden pt-6 text-center text-xs xl:grid xl:grid-cols-7">
            <div className="">Assets</div>
            <div>Total deposited</div> <div>Deposit APY</div>
            <div>Total borrowed</div>
            <div className="flex justify-center space-x-1">
              <div>Borrow APY,variable</div>
              <Popover
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 10 },
                }}
              >
                <PopoverHandler>
                  <div className="flex items-center hover:cursor-pointer">
                    <AiOutlineQuestionCircle height={10} width={10} />
                  </div>
                </PopoverHandler>
                <PopoverContent className="bg-gray-800 text-white">
                  Variable interest rate will fluctuate based on the market
                  conditions. Recommended for short-term positions.
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex justify-center space-x-1">
              <div>Borrow APY,stable</div>
              <Popover
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 10 },
                }}
              >
                <PopoverHandler>
                  <div className="flex items-center hover:cursor-pointer">
                    <AiOutlineQuestionCircle height={10} width={10} />
                  </div>
                </PopoverHandler>
                <PopoverContent className="bg-gray-800 text-white">
                  Stable interest rate will stay the same for the duration of
                  your loan. Recommended for long-term loan periods and for
                  users who prefer predictability.
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {MarketCoins.map((marketCoin, index) => (
            <div key={index}>
              <div className="pt-4 sm:pt-6 xl:grid xl:grid-cols-7 xl:items-center">
                <div className="flex items-center justify-start space-x-2 xl:ml-[10px]">
                  <div>
                    <Image
                      src={marketCoin.image}
                      alt={`${marketCoin.name} Logo`}
                      height={40}
                      width={40}
                      className="h-auto w-auto rounded-full xl:hidden"
                      priority
                    />
                    <Image
                      src={marketCoin.image}
                      alt={`${marketCoin.name} Logo`}
                      height={30}
                      width={30}
                      className="hidden h-auto w-auto rounded-full xl:flex"
                      priority
                    />
                  </div>
                  <div className="">
                    <div className="font-bold">{marketCoin.symbol}</div>
                    <div className="text-gray-400 text-xs">
                      {marketCoin.name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 xl:justify-center xl:pt-0">
                  <div className="xl:hidden">Total deposited</div>
                  <div className="text-center">
                    <div>{marketCoin?.totalDeposited ?? 0}</div>
                    <div className="text-sm">
                      <span className="text-gray-400">$</span>
                      {(marketCoin?.totalDeposited ?? 0) * 10}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between pt-4 xl:justify-center xl:pt-0">
                  <div className="xl:hidden">Deposit APY</div>
                  <div className="">
                    {marketCoin.depositAPY}{" "}
                    <span className="text-gray-400">%</span>
                  </div>
                </div>
                <div className="pt-4 xl:hidden">
                  <div className="border" />
                </div>
                <div className="flex items-center justify-between pt-4 xl:justify-center xl:pt-0">
                  <div className="xl:hidden">Total borrowed</div>
                  <div className="text-center">
                    <div>{marketCoin.totalBorrowed}</div>
                    <div className="text-sm">
                      <span className="text-gray-400">$</span>
                      {marketCoin.totalBorrowed * 10}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between pt-4 xl:justify-center xl:pt-0">
                  <div className="flex space-x-1 xl:hidden">
                    <div>Borrow APY,variable</div>
                    <Popover
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0, y: 10 },
                      }}
                    >
                      <PopoverHandler>
                        <div className="flex items-center hover:cursor-pointer">
                          <AiOutlineQuestionCircle height={10} width={10} />
                        </div>
                      </PopoverHandler>
                      <PopoverContent className="bg-gray-800 text-white">
                        Variable interest rate will fluctuate based on the
                        market conditions. Recommended for short-term positions.
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="">
                    {marketCoin.borrowApyVariable}{" "}
                    <span className="text-gray-400">%</span>
                  </div>
                </div>
                <div className="flex justify-between pt-4 xl:justify-center xl:pt-0">
                  <div className="flex justify-center space-x-1 xl:hidden">
                    <div>Borrow APY,stable</div>
                    <Popover
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0, y: 10 },
                      }}
                    >
                      <PopoverHandler>
                        <div className="flex items-center hover:cursor-pointer">
                          <AiOutlineQuestionCircle height={10} width={10} />
                        </div>
                      </PopoverHandler>
                      <PopoverContent className="bg-gray-800 text-white">
                        Stable interest rate will stay the same for the duration
                        of your loan. Recommended for long-term loan periods and
                        for users who prefer predictability.
                      </PopoverContent>
                    </Popover>
                  </div>
                  <AiOutlineMinus height={20} width={20} />
                </div>
                <div className="flex justify-center p-4 xl:block xl:pt-4">
                  <Link href={`/details/${marketCoin.name}`}>
                    <motion.button
                      // className="h-[35px] w-[100px] rounded-lg border"
                      className="action-button"
                    >
                      <div className="">Details</div>
                    </motion.button>
                  </Link>
                </div>
              </div>
              <div className="hidden pt-4 xl:block">
                <div className="border-gray-600 border" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketCoins;
