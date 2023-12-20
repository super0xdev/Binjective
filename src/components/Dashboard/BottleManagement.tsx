import React, { useState, useEffect } from "react";
import Bottle from "./Bottle";
import useMultiBucketInfo from "~/lib/hooks/useMultiBucketInfo";
import type { PriceList } from "~/lib/utils/inj/oracle/getMultiAggregatorInfo";
import { REFETCH_SEC } from "~/lib/utils/constants";
import { cn } from "~/lib/utils/cn";

interface BottleManagementProps {
  oracleInfoList: PriceList;
  loadingOracleInfo: boolean;
}

const BottleManagement = ({
  oracleInfoList,
  loadingOracleInfo,
}: BottleManagementProps) => {
  const { totalBucketData, loadingTotalBucketInfo } =
    useMultiBucketInfo(REFETCH_SEC);

  return (
    <>
      {/* Mobile */}
      <div className="pt-10 xl:hidden">
        <Bottle
          bucketInfo={totalBucketData ?? {}}
          loadingBucketInfo={loadingTotalBucketInfo}
          oracleInfoList={oracleInfoList ?? {}}
          loadingOracleInfo={loadingOracleInfo}
        />
        <div className="h-10"></div>
        {/* <Redeem /> */}
      </div>

      {/* Desktop */}
      <div
        className={cn(
          "hidden space-y-10 bg-blue-100 pt-[2.5rem] md:grid-cols-1 md:space-y-0 md:space-x-6 md:pb-30 xl:grid xl:pb-64"
        )}
      >
        <div className="">
          <Bottle
            bucketInfo={totalBucketData ?? {}}
            loadingBucketInfo={loadingTotalBucketInfo}
            oracleInfoList={oracleInfoList ?? {}}
            loadingOracleInfo={loadingOracleInfo}
          />
          <div className="h-12"></div>
          {/* <Redeem /> */}
          <div className="h-14"></div>
        </div>
      </div>
    </>
  );
};

export default BottleManagement;
