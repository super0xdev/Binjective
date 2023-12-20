import { type NextPage } from "next";
import Head from "next/head";
import BottleManagement from "~/components/Dashboard/BottleManagement";
import NetInfoBanner from "~/components/Dashboard/NetINfoBanner";
import useMultiAggregator from "~/lib/hooks/useMultiAggregator";
import OBJECTID from "~/lib/utils/objectIdMap";

const REFETCH_SEC = 60;

const Home: NextPage = () => {
  const oracleList: Record<string, string> = OBJECTID.SUPRAOBJECTID;
  const oracleNameList = Object.keys(oracleList);
  const oracleIdList = Object.values(oracleList);

  const { oracleInfoList, loadingOracleInfo } = useMultiAggregator(
    oracleNameList,
    oracleIdList,
    REFETCH_SEC
  );

  return (
    <>
      <Head>
        <title>Bijective - Dashboard</title>
        <meta
          name="description"
          content="Enhance capital efficiency with bijection between INJ and stable asset on Injective."
        />
        <link rel="icon" href="/bijective-symbol.png" />
      </Head>
      <main className="flex justify-center bg-slate-700 pt-21.5">
        <div className="w-full">
          <NetInfoBanner
            oracleInfoList={oracleInfoList ?? {}}
            loadingOracleInfo={loadingOracleInfo}
          />
          <BottleManagement
            oracleInfoList={oracleInfoList ?? {}}
            loadingOracleInfo={loadingOracleInfo}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
