import React from "react";
import Image from "next/image";
import useMultiBottleInfo from "~/lib/hooks/useMultiBottleInfo";
import type { PriceList } from "~/lib/utils/inj/oracle/getMultiAggregatorInfo";
import { useState, useEffect } from "react";
import { formatBigInt } from "~/lib/utils/unit";
import FormatNumber from "../Formats/formatNumber";

interface NetInfoProps {
  oracleInfoList: PriceList;
  loadingOracleInfo: boolean;
}

const NetInfo = ({ oracleInfoList, loadingOracleInfo }: NetInfoProps) => {
  const [tvl, setTvl] = useState(0);
  const [collateralRatio, setCollateralRatio] = useState(0);
  const [debt, setDebt] = useState(0);
  const { bottleInfo, loadingBottleInfo } = useMultiBottleInfo(60);

  const assetList = Object.keys(bottleInfo ?? {});
  const userBottleTVLList = Object.values(bottleInfo ?? {}).map(
    (bottle, index) => {
      const assestPrice = oracleInfoList[assetList[index] as string] ?? 0;
      return (
        Number(
          formatBigInt(BigInt(bottle.collateralAmount ?? 0), bottle.decimals)
        ) * assestPrice
      );
    }
  );

  const userBottleDebtList = Object.values(bottleInfo ?? {}).map((bottle) =>
    Number(formatBigInt(BigInt(bottle.buckAmount ?? 0), 9))
  );

  useEffect(() => {
    if (!bottleInfo) return;
    setTvl(userBottleTVLList.reduce((a, b) => a + b, 0));
    setDebt(userBottleDebtList.reduce((a, b) => a + b, 0));
    // setTotalBottle(bucketData.totalBottle);
  }, [bottleInfo]);

  useEffect(() => {
    if (!debt) return;
    setCollateralRatio((tvl / debt) * 100);
  }, [tvl, debt]);

  return (
    <div className="grid py-8 text-white md:flex md:grid-cols-2 md:space-x-8 lg:py-0">
      <div className="flex items-center space-x-4">
        <div className="text-4xl">
          <Image
            src="/wallet.svg"
            width={30}
            height={30}
            alt="wallet"
            className="h-auto w-auto"
          />
        </div>
        <div>
          <div>
            <p>Total Collateral Value</p>
          </div>
          <div className="flex text-xl font-bold">
            <span>$</span>
            <FormatNumber
              number={tvl}
              isLoading={loadingBottleInfo && loadingOracleInfo}
              notation="standard"
              className="h-8 w-20 opacity-5"
              bgColor="bg-gray-light3"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4 pt-4 md:pt-0">
        <div className="text-4xl">
          <Image
            src="/heart.svg"
            width={30}
            height={30}
            alt="heart"
            className="h-auto w-auto"
          />
        </div>
        <div>
          <p>Total Collateral Ratio</p>
          <div className="flex text-xl font-bold">
            <FormatNumber
              number={collateralRatio}
              isLoading={loadingBottleInfo && loadingOracleInfo}
              notation="standard"
              className="h-8 w-20 opacity-5"
              bgColor="bg-gray-light3"
            />
            <span>%</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4 pt-4 md:pt-0">
        <div className="text-4xl">
          <Image
            src="/bucket-token.svg"
            alt="Buck-Token"
            height={30}
            width={30}
            className="h-auto w-auto"
          />
        </div>
        <div>
          <p>Debt</p>
          <div className="text-xl font-bold">
            <FormatNumber
              number={debt}
              isLoading={loadingBottleInfo && loadingOracleInfo}
              notation="standard"
              minFractionDigits={0}
              className="h-8 w-20 opacity-5"
              bgColor="bg-gray-light3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetInfo;
