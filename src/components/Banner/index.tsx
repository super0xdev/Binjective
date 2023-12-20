import React, { useEffect, useState } from "react";
import Image from "next/image";
import useMultiTank from "~/lib/hooks/useMultiTank";
import FormatNumber from "../Formats/formatNumber";

import Link from "next/link";
import type { BucketList } from "~/lib/utils/inj/bucket/getMultiBucketInfo";
import { formatBigInt } from "~/lib/utils/unit";
import { motion } from "framer-motion";
import { CoinPrice } from "types";

interface BannerProps {
  bucketInfo: BucketList;
  assetPriceList: CoinPrice[];
  loadingBucketInfo: boolean;
  loadingPriceInfo: boolean;
}

const Banner = ({
  bucketInfo,
  assetPriceList,
  loadingBucketInfo,
  loadingPriceInfo,
}: BannerProps) => {
  const [totalTVL, setTotalTVL] = useState(0);
  const [totalBottle, setTotalBottle] = useState(0);
  const [totalCollateralRatio, setTotalCollateralRatio] = useState(0);
  const [buckSupply, setBuckSupply] = useState(0);
  const [tankTVL, setTankTVL] = useState(0);

  const assetList = Object.keys(bucketInfo);
  const bucketTVLList = Object.values(bucketInfo).map((bucket, index) => {
    const assetPrice =
      Number(
        assetPriceList.find((coin) => coin.symbol === assetList[index])?.price
      ) ?? 0;
    return (
      Number(
        formatBigInt(BigInt(bucket.collateralVault), bucket.collateralDecimal)
      ) * assetPrice
    );
  });
  const bucketBottlesList = Object.values(bucketInfo).map((bucket) =>
    Number(bucket.bottleTableSize)
  );

  const bucketMinedBuckAmountList = Object.values(bucketInfo).map((bucket) =>
    Number(formatBigInt(BigInt(bucket.mintedBuckAmount), 9))
  );

  useEffect(() => {
    if (!bucketInfo) return;
    setTotalTVL(bucketTVLList.reduce((a, b) => a + b, 0));
    setTotalBottle(bucketBottlesList.reduce((a, b) => a + b, 0));
    setBuckSupply(bucketMinedBuckAmountList.reduce((a, b) => a + b, 0));
    // setTotalBottle(bucketData.totalBottle);
  }, [bucketInfo]);

  useEffect(() => {
    if (!buckSupply) return;
    setTotalCollateralRatio((totalTVL / buckSupply) * 100);
  }, [totalTVL, buckSupply]);

  const {
    tankInfoList,
    refetchTankInfo,
    loadingTankInfo: isTankInfoLoading,
  } = useMultiTank();

  useEffect(() => {
    const handleRefetch = async () => {
      await refetchTankInfo();
    };

    setInterval(() => {
      void handleRefetch();
    }, 60 * 1000);
  }, [refetchTankInfo]);

  useEffect(() => {
    if (!tankInfoList) setTankTVL(0);
    else {
      let total = 0;
      Object.values(tankInfoList).forEach((tankInfo) => {
        total += parseFloat(tankInfo.buckReserve);
      });
      setTankTVL(total);
    }
  }, [tankInfoList]);

  return (
    <div
      id="banner"
      className="relative h-fit w-full bg-banner-pattern bg-no-repeat px-8 pt-32 pb-10 lg:h-200 lg:px-[100px] lg:pb-0 lg:pt-[180px]"
    >
      <div className="z-[1] flex w-full flex-col">
        <div className="relative flex flex-1 flex-row">
          <div className="w-full">
            <p className="md:w-154 text-5xl font-black md:text-6xl md:leading-[80px]">
              Bijective
              <br />
              Built on Injective
            </p>
            <p className="w-80 pt-[10px] pb-4 text-xl md:w-[500px] md:pb-8 md:pt-[20px] md:text-2xl">
              Enhance capital efficiency through bijection between INJ and
              stable asset
            </p>
            <Link href="/dashboard">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#FFF",
                  color: "#3B86E0",
                  border: "2px solid #3B86E0",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="my-[20px] w-[180px] items-center justify-center rounded-2xl border-2 border-transparent bg-[#3B86E0] px-6 py-4 font-semibold text-white"
              >
                Try Now
              </motion.button>
            </Link>
          </div>
          {/* <Image
            src="/bottle.png"
            alt="bottle"
            width={320}
            height={320}
            className="absolute right-0 hidden h-80 w-80 md:block"
            priority={true}
          /> */}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-[28px] lg:grid-cols-3 xl:grid-cols-4">
          <div className="flex flex-row items-center md:flex-col md:items-start">
            <p className="my-2 md:order-2">TVL</p>
            <div className="flex flex-1 justify-end text-base font-semibold leading-4 text-primary-default md:order-1 md:text-[32px] md:leading-[42px]">
              <span className="mr-2">$</span>
              <FormatNumber
                number={(
                  totalTVL + Number(formatBigInt(BigInt(tankTVL), 9))
                ).toFixed(0)}
                isLoading={
                  loadingBucketInfo || isTankInfoLoading || loadingPriceInfo
                }
                notation="standard"
                minFractionDigits={0}
              />
            </div>
          </div>
          <div className="flex flex-row items-center md:flex-col md:items-start">
            <p className="my-2 md:order-2">Total Positions</p>
            <span className="flex flex-1 justify-end text-base font-semibold leading-4 text-primary-default md:order-1 md:text-[32px] md:leading-[42px]">
              <FormatNumber
                number={totalBottle}
                isLoading={loadingBucketInfo}
                notation="standard"
                minFractionDigits={0}
              />
            </span>
          </div>
          {/* <div className="flex flex-row items-center md:flex-col md:items-start">
            <p className="my-2 md:order-2">Total Collateral Ratio</p>
            <div className="flex flex-1 justify-end text-base font-semibold leading-4 text-primary-default md:order-1 md:text-[32px] md:leading-[42px]">
              <FormatNumber
                number={totalCollateralRatio}
                isLoading={loadingBucketInfo && loadingOracleInfo}
                notation="standard"
              />
              <span>%</span>
            </div>
          </div> */}
          <div className="flex flex-row items-center md:flex-col md:items-start">
            <p className="my-2 md:order-2">BUCK Supply</p>
            <div className="flex flex-1 justify-end text-base font-semibold leading-4 text-primary-default md:order-1 md:text-[32px] md:leading-[42px]">
              <FormatNumber
                number={buckSupply.toFixed(0)}
                isLoading={loadingBucketInfo}
                notation="standard"
                minFractionDigits={0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
