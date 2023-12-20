/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Image, { type StaticImageData } from "next/image";
import React from "react";
import InfoPopover from "../Layout/InfoPopover";
import { MARKET_COINS } from "~/lib/utils/constants";
import type { BucketList } from "~/lib/utils/inj/bucket/getMultiBucketInfo";
import { useRouter } from "next/router";
import FormatNumber from "../Formats/formatNumber";
import { type CoinPrice } from "types";

type PopoverInfo = {
  title: string;
  description: string;
};

const PopoverInfos: PopoverInfo[] = [
  {
    title: "Total CR",
    description:
      "The total collateralization ratio of all the assets in the market.",
  },
  {
    title: "Min CR",
    description:
      "The minimum collateralization ratio of all the assets in the market.",
  },
];

interface MarketCoinsProps {
  bucketInfo: BucketList;
  loadingBucketInfo: boolean;
  assetPriceList: CoinPrice[];
  loadingPriceInfo: boolean;
}

const MarketCoins = ({
  bucketInfo,
  loadingBucketInfo,
  assetPriceList,
  loadingPriceInfo,
}: MarketCoinsProps) => {
  const router = useRouter();

  // TODO: fix price, function
  const marketCoinsList = MARKET_COINS.map((item) => ({
    ...item,
    totalDeposited: loadingBucketInfo
      ? 0
      : Number(bucketInfo[item.symbol]?.collateralVault) / 10 ** item.decimal,
    totalBuckMinted: loadingBucketInfo
      ? 0
      : Number(bucketInfo[item.symbol]?.mintedBuckAmount) / 10 ** 9,
    minCR: loadingBucketInfo
      ? "-/-"
      : bucketInfo[item.symbol]?.minCollateralRatio,
    price: loadingPriceInfo
      ? 0
      : Number(
          assetPriceList?.find((coin) => coin.symbol === item.symbol)?.price
        ),
  }));

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    void router.push("/dashboard");
  };

  return (
    <div className="my-[-50px] bg-slate-700 py-[90px] px-8 text-white md:py-[100px] lg:px-[100px]">
      <div className="my-[20px] text-2xl font-bold md:text-4xl">
        <p>Injective Market</p>
      </div>
      <div className="flex w-full justify-center rounded-xl md:mx-0">
        <div className="h-auto w-full rounded-lg">
          <div className="hidden py-6 text-center text-sm text-slate-200 xl:grid xl:grid-cols-5">
            <div className="text-left">Assets</div>
            <div>Total Deposited</div>
            {/* <div>Deposit APY</div> */}
            <div>Total $BUCK Minted</div>
            <InfoPopover
              title={PopoverInfos[0]!.title}
              description={PopoverInfos[0]!.description}
            />
            <InfoPopover
              title={PopoverInfos[1]!.title}
              description={PopoverInfos[1]!.description}
            />
          </div>

          <div className="flex flex-row gap-10 overflow-x-auto xl:flex-col xl:gap-x-0 xl:overflow-hidden">
            {marketCoinsList.map((marketCoin) => (
              <div
                key={marketCoin.symbol}
                onClick={handleClick}
                className="min-w-[350px] flex-col space-y-6 rounded-lg bg-slate-700 p-10 shadow-lg hover:cursor-pointer xl:grid xl:grid-cols-5 xl:flex-row xl:items-center xl:space-y-0 xl:bg-transparent xl:p-0 xl:shadow-none"
              >
                <div className="flex items-center justify-start space-x-2">
                  <div>
                    <Image
                      src={marketCoin.image}
                      alt={`${marketCoin.name} Logo`}
                      height={30}
                      width={30}
                      className="h-10 w-10 rounded-full"
                      priority
                    />
                  </div>
                  <div className="pl-2">
                    <div className="font-bold">{marketCoin.name}</div>
                    <div className="text-sm">{marketCoin.symbol}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between xl:flex xl:justify-center xl:pt-0">
                  <div className="xl:hidden">Total Deposited</div>
                  <div className="text-end font-bold xl:text-center">
                    <div>
                      <FormatNumber
                        number={marketCoin?.totalDeposited.toFixed(0) ?? 0}
                        // isLoading={
                        //   loadingBucketInfo || isTankInfoLoading || loadingPriceInfo
                        // }
                        notation="standard"
                        minFractionDigits={0}
                      />
                    </div>
                    <div className="text-sm">
                      <span>$</span>
                      <FormatNumber
                        number={
                          (
                            (marketCoin?.totalDeposited ?? 0) *
                            (marketCoin?.price ?? 0)
                          ).toFixed(0) ?? 0
                        }
                        // isLoading={
                        //   loadingBucketInfo || isTankInfoLoading || loadingPriceInfo
                        // }
                        notation="standard"
                        minFractionDigits={0}
                      />
                      {/* {(
                        (
                          (marketCoin?.totalDeposited || 0) *
                          (marketCoin?.price || 0)
                        ).toFixed(0) || 0
                      ).toLocaleString("en")} */}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between xl:flex xl:justify-center xl:pt-0">
                  <div className="xl:hidden">Total $BUCK Minted</div>
                  <div className="pt-2 text-end font-bold xl:pt-0 xl:text-center">
                    <div>
                      $
                      <FormatNumber
                        number={marketCoin.totalBuckMinted.toFixed(0) ?? 0}
                        // isLoading={
                        //   loadingBucketInfo || isTankInfoLoading || loadingPriceInfo
                        // }
                        notation="standard"
                        minFractionDigits={0}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between xl:flex xl:justify-center xl:pt-0">
                  <div className="flex space-x-1 xl:hidden">
                    <InfoPopover
                      title={PopoverInfos[0]!.title}
                      description={PopoverInfos[0]!.description}
                    />
                  </div>
                  <div className="text-end font-bold xl:text-center">
                    {marketCoin.totalBuckMinted
                      ? (
                          ((marketCoin?.totalDeposited ?? 0) *
                            (marketCoin?.price ?? 0) *
                            100) /
                          marketCoin?.totalBuckMinted
                        ).toFixed(2)
                      : "-/-"}
                    <span>%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between xl:flex xl:justify-center xl:pt-0">
                  <div className="flex space-x-1 xl:hidden ">
                    <InfoPopover
                      title={PopoverInfos[1]!.title}
                      description={PopoverInfos[1]!.description}
                    />
                  </div>
                  <div className="text-end font-bold xl:text-center">
                    {marketCoin.minCR ?? "-/-"}
                    <span>%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketCoins;
