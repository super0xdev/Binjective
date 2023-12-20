import { type NextPage } from "next";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import Info from "~/components/Earn/Info";
import { cn } from "~/lib/utils/cn";
import TabButtonSection from "~/components/Earn/TabButtonSection";
import TabContentSection from "~/components/Earn/TabContentSection";
import OBJECTID from "~/lib/utils/objectIdMap";
import useMultiTank from "~/lib/hooks/useMultiTank";
import useMultiTankInfo from "~/lib/hooks/useMultiTankInfo";
import useMultiEarnInfo from "~/lib/hooks/useMultiEarnInfo";
import useMultiAggregator from "~/lib/hooks/useMultiAggregator";

const REFETCH_SEC = 60;

const EarnPage: NextPage = () => {
  const [tab, setTab] = useState(0);

  const oracleList: Record<string, string> = OBJECTID.SUPRAOBJECTID;
  const oracleNameList = Object.keys(oracleList);
  const oracleIdList = Object.values(oracleList);

  const { oracleInfoList, refetchOrcaleInfo, loadingOracleInfo } =
    useMultiAggregator(oracleNameList, oracleIdList, REFETCH_SEC);

  const {
    totalTankData,
    refetchTotalTankData,
    loadingTotalTankData,
    successTotalTankData,
  } = useMultiTankInfo(3);

  const {
    totalEarnData,
    refetchTotalEarnData,
    loadingTotalEarnData,
    successTotalEarnData,
  } = useMultiEarnInfo();

  const { tankInfoList, refetchTankInfo, loadingTankInfo } = useMultiTank();

  useEffect(() => {
    const interval = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      const handleRefetch = async () => {
        await refetchOrcaleInfo();
        // await refetchTotalTankData();
        await refetchTotalEarnData();
      };

      void handleRefetch();
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <>
      <Head>
        <title>Bijective - Earn</title>
        <meta
          name="description"
          content="Enhance capital efficiency with bijection between INJ and stable asset on Injective."
        />
        <link rel="icon" href="/bijective-symbol.png" />
      </Head>
      <main className={cn("mt-20 w-full bg-slate-700 text-white")}>
        <Info
          tankInfoList={tankInfoList}
          isTankInfoLoading={loadingTankInfo}
          setTab={setTab}
        />

        <TabButtonSection tab={tab} setTab={setTab} />

        <TabContentSection
          totalTankData={totalTankData ?? 0}
          isTankInfoLoading={loadingTotalTankData}
          totalEarnData={totalEarnData ?? {}}
          isEarnInfoLoading={loadingTotalEarnData}
          oracleInfoList={oracleInfoList ?? {}}
          loadingOracleInfo={loadingOracleInfo}
        />
      </main>
    </>
  );
};

export default EarnPage;
