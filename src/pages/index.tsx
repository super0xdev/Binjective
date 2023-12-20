import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useContext } from "react";
import MarketCoins from "~/components/Overview/MarketCoins";
import Banner from "~/components/Banner";
import { HINTS, REFETCH_SEC } from "~/lib/utils/constants";
import useMultiBucketInfo from "~/lib/hooks/useMultiBucketInfo";
import { ProtocolContext } from "~/context/ProtocolProvider";
import { useCounterStore } from "~/context/CounterProvider";

const OverviewPage: NextPage = () => {
  const { totalBucketData, loadingTotalBucketInfo } =
    useMultiBucketInfo(REFETCH_SEC);

  const { cryptosPriceData, loadingPrice } = useContext(ProtocolContext);

  return (
    <>
      <Head>
        <title>Bijective - Overview</title>
        <meta
          name="description"
          content="Enhance capital efficiency with bijection between INJ and stable asset on Injective."
        />
        <link rel="icon" href="/bijective-symbol.png" />
      </Head>
      <main className="w-full pt-20">
        <Banner
          bucketInfo={totalBucketData ?? {}}
          loadingBucketInfo={loadingTotalBucketInfo}
          assetPriceList={cryptosPriceData ?? {}}
          loadingPriceInfo={loadingPrice}
        />
        <MarketCoins
          bucketInfo={totalBucketData ?? {}}
          loadingBucketInfo={loadingTotalBucketInfo}
          assetPriceList={cryptosPriceData ?? {}}
          loadingPriceInfo={loadingPrice}
        />
        <div className="z-[10] flex w-full flex-1 justify-start bg-white bg-wave-pattern bg-cover bg-no-repeat px-5 pt-[20px] pb-[50px] md:px-10 md:pt-[120px] md:pb-[150px]">
          {/* <div className="my-10 flex flex-1 flex-col items-center gap-y-6 overflow-x-auto md:gap-x-6 lg:flex-row">
            {HINTS.map(({ title, description, img }) => (
              <div
                key={title}
                className="flex h-[280px] w-full flex-1 flex-col justify-start rounded-[20px] border-2 bg-white py-10 px-6 "
              >
                <div className="flex flex-row items-center justify-center">
                  <Image
                    src={img}
                    alt="info"
                    width={30}
                    height={30}
                    className="mx-2 my-4 h-10 w-10"
                  />
                  <p className="text-[32px]">{title}</p>
                </div>
                <p className="text-xs">{description}</p>
              </div>
            ))}
          </div> */}
        </div>
      </main>
    </>
  );
};

export default OverviewPage;
