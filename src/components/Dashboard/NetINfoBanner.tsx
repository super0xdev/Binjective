import React from "react";
import NetInfo from "./NetInfo";
import type { PriceList } from "~/lib/utils/inj/oracle/getMultiAggregatorInfo";

interface BannerProps {
  oracleInfoList: PriceList;
  loadingOracleInfo: boolean;
}

const NetInfoBanner = ({ oracleInfoList, loadingOracleInfo }: BannerProps) => {
  return (
    <div className="mt-22 flex w-full flex-1 items-center justify-center bg-slate-700 py-16 lg:py-24">
      <div className="mx-8 flex flex-1 flex-col lg:mx-[100px] lg:flex-row">
        <div className="pr-0 text-6.5xl font-black text-white md:pr-20">
          Position
        </div>
        <div className="flex flex-1 justify-start lg:justify-end">
          <NetInfo
            oracleInfoList={oracleInfoList ?? {}}
            loadingOracleInfo={loadingOracleInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default NetInfoBanner;
