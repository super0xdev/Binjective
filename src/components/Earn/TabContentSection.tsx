import { cn } from "~/lib/utils/cn";
import { TANK_LIST } from "~/lib/utils/constants";
import TankCard from "~/components/Earn/TankCard";
import FormatNumber from "../Formats/formatNumber";
import { useState, useEffect } from "react";
import type { EarnList } from "~/lib/hooks/useMultiEarnInfo";
import type { PriceList } from "~/lib/utils/inj/oracle/getMultiAggregatorInfo";
import ClaimableLine from "./ClaimableLine";
import useTankClaimAll from "~/lib/hooks/Tank/useTankClaimAll";
import Image from "next/image";
import { motion } from "framer-motion";

interface TabContentSectionProps {
  totalTankData: number;
  isTankInfoLoading: boolean;
  totalEarnData: EarnList;
  isEarnInfoLoading: boolean;
  oracleInfoList: PriceList;
  loadingOracleInfo: boolean;
}

const TabContentSection = ({
  totalTankData,
  isTankInfoLoading,
  totalEarnData,
  isEarnInfoLoading,
  oracleInfoList,
  loadingOracleInfo,
}: TabContentSectionProps) => {
  const [totalEarn, setTotalEarn] = useState(0);
  const { executeClaimAll, loadingClaimAll } = useTankClaimAll();

  const assetList = Object.keys(totalEarnData ?? {});
  const userTankEarnPriceList = Object.values(totalEarnData ?? {}).map(
    (tank, index) => {
      const assestPrice = oracleInfoList[assetList[index] as string] ?? 0;
      return tank * assestPrice;
    }
  );

  useEffect(() => {
    setTotalEarn(userTankEarnPriceList.reduce((a, b) => a + b, 0));
    // setTotalBottle(bucketData.totalBottle);
  }, [totalEarnData]);

  return (
    <div id="tank" className="w-full bg-slate-700 py-8 px-4 lg:px-0 lg:py-24">
      <div className="mx-auto mb-12 w-full max-w-360">
        <div
          className={cn(
            "flex w-full flex-col items-center justify-between lg:grid lg:grid-cols-3 lg:flex-row lg:space-x-4 lg:px-7"
          )}
        >
          <div className="w-full space-y-2">
            <div className="flex h-29 w-full items-center justify-between gap-2 rounded-2xl border-[1px] border-primary-dark3 bg-black p-6 lg:col-span-1 lg:h-36 ">
              <div
                className={`grid grid-cols-${TANK_LIST.length} w-full items-center`}
              >
                {TANK_LIST.length > 0
                  ? TANK_LIST.map((tank, index) => (
                      <div
                        key={index}
                        className="col-span-1 flex flex-col items-center text-white sm:space-y-4"
                      >
                        <div className={cn("mt-1 flex items-center space-x-2")}>
                          <Image
                            src={tank.img}
                            alt={`${tank.name} tank logo`}
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
                          <span className="text-xl font-medium tracking-[1px] text-white">
                            {tank.name}
                          </span>
                        </div>
                        <div className="flex items-center text-lg font-normal leading-loose">
                          <span>$</span>
                          <span className="">
                            {
                              <FormatNumber
                                number={
                                  oracleInfoList[tank.name]?.toFixed(3) ?? 0
                                }
                                isLoading={isTankInfoLoading}
                                notation="standard"
                                bgColor="bg-gray-light2 opacity-30"
                                className="h-10 w-30"
                              />
                            }
                          </span>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div
              className={cn(
                "flex h-29 w-full items-center justify-between gap-2 rounded-2xl border-[1px] border-primary-dark3 bg-black p-6 lg:col-span-1 lg:h-36 lg:flex-col lg:items-start"
              )}
            >
              <span
                className={cn("h-full text-xl font-medium text-white lg:h-fit")}
              >
                Your BUCK <br className="lg:hidden" /> in Tank
              </span>
              <div className="flex flex-col items-end lg:items-start">
                <span className="text-2xl font-semibold leading-none text-white lg:text-3xl-32 lg:leading-loose">
                  <FormatNumber
                    number={totalTankData ?? 0}
                    isLoading={isTankInfoLoading}
                    notation="standard"
                    bgColor="bg-gray-light2 opacity-30"
                    className="h-10 w-30"
                  />
                </span>
              </div>
            </div>
          </div>
          <div
            className={cn(
              "mt-2 flex items-center justify-between gap-2 rounded-2xl border-[1px] border-primary-dark3 bg-black p-6 lg:col-span-2 lg:mt-0 lg:h-[18.5rem] lg:flex-col lg:items-start"
            )}
          >
            <div className="flex flex-col lg:flex">
              <span className={cn("text-xl font-medium text-white")}>
                Claimable
              </span>
              <div className="grid grid-cols-3 space-y-2 pt-4 text-white sm:grid-cols-4 lg:px-6 lg:text-lg">
                <div className="col-span-1 mt-5 space-y-6 lg:mt-3">
                  <div className={cn("")}>Assets</div>
                  <div className={cn("")}>Claimable</div>
                </div>
                {TANK_LIST.map((tank, index) => (
                  <div
                    className="col-span-1 space-y-2"
                    key={tank.id + index.toString()}
                  >
                    <ClaimableLine
                      tankInfo={tank}
                      earnInfo={totalEarnData[tank.name] ?? 0}
                      isEarnLoading={isEarnInfoLoading}
                    />
                  </div>
                ))}
              </div>
              <div className="sm:hidden">
                <div className="flex items-center space-x-4 pt-3">
                  <div className={cn("col-span-1 text-white")}>Total Worth</div>
                  <div className="col-span-1 items-center justify-center gap-2 sm:col-span-2">
                    <div className="flex text-2xl font-normal leading-loose text-white sm:text-3xl">
                      <span className={cn("")}>$</span>
                      <span className={cn("")}>
                        <FormatNumber
                          number={totalEarn ?? 0}
                          isLoading={isEarnInfoLoading ?? loadingOracleInfo}
                          bgColor="bg-gray-light2 opacity-30"
                          notation="standard"
                          className="h-6 w-30"
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center pt-3">
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "#FFF",
                      color: "#3B86E0",
                      border: "1px solid #3B86E0",
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="h-10.5 w-full rounded-2.5 bg-primary-default text-lg font-medium text-white lg:w-31.25"
                    onClick={() => executeClaimAll()}
                  >
                    Claim All
                  </motion.button>
                </div>
              </div>
              <div className="hidden items-center space-x-6 px-6 pt-10 sm:grid sm:grid-cols-4">
                <div className="col-span-2 flex items-center space-x-4 sm:space-x-8">
                  <div className={cn("col-span-1 text-lg text-white")}>
                    Total Worth
                  </div>
                  <div className="col-span-1 items-center justify-center gap-2 sm:col-span-2">
                    <div className="flex items-center text-2xl font-normal leading-loose text-white sm:text-3xl">
                      $
                      <FormatNumber
                        number={totalEarn ?? 0}
                        isLoading={isEarnInfoLoading ?? loadingOracleInfo}
                        bgColor="bg-gray-light2 opacity-30"
                        notation="standard"
                        className="h-8 w-30"
                      />
                    </div>
                  </div>
                </div>
                <div className="justify-center pt-3 sm:col-span-1 sm:grid sm:pt-0">
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "#FFF",
                      color: "#3B86E0",
                      border: "1px solid #3B86E0",
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="mx-5 h-10.5 w-full rounded-2.5 bg-primary-default text-lg font-medium text-white lg:w-31.25"
                    onClick={() => executeClaimAll()}
                  >
                    Claim All
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tank Cards */}
        <div
          className={cn(
            "mt-12 flex w-full flex-wrap items-center justify-center gap-4 lg:mt-19 lg:px-3"
          )}
        >
          {TANK_LIST.map((tank, index) => (
            <TankCard
              key={tank.id + index.toString()}
              tankInfo={tank}
              earnInfo={totalEarnData[tank.name] ?? 0}
              isEarnLoading={isEarnInfoLoading}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabContentSection;
