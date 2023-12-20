import Image, { type StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import UsdcLogo from "../../../public/usdc-light.png";
import UsdtLogo from "../../../public/usdt-light.png";
import DepositModal from "../Modals/DepositModal";
import BottleModal from "../Modals/BottleModal";
import useBalances from "~/lib/hooks/useBalances";
import useDisclosure from "~/lib/hooks/useDisclosure";
import { EVENTS, MARKET_COINS } from "~/lib/utils/constants";
import DataColumn from "./DataColumn";
import type { BucketList } from "~/lib/utils/inj/bucket/getMultiBucketInfo";
import type { PriceList } from "~/lib/utils/inj/oracle/getMultiAggregatorInfo";
import useMultiBottleInfo from "~/lib/hooks/useMultiBottleInfo";
import { formatBigInt } from "~/lib/utils/unit";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils/cn";
import useInjWallet from "~/lib/hooks/useInjWallet";

const AvailableCoinTypes: string[] = MARKET_COINS.map((coin) => coin.coinType);

const AvailableCoinDecimals: number[] = MARKET_COINS.map(
  (coin) => coin.decimal
);

interface BottleProps {
  bucketInfo: BucketList;
  loadingBucketInfo: boolean;
  oracleInfoList: PriceList;
  loadingOracleInfo: boolean;
}

const Bottle = ({
  bucketInfo,
  loadingBucketInfo,
  oracleInfoList,
}: BottleProps) => {
  const [innerHeight, setInnerHeight] = useState(0);
  const { connected } = useInjWallet();
  const [selectedToDeposit, setSelectedToDeposit] = useState<{
    symbol: string;
    image: StaticImageData | string;
  }>({
    symbol: "",
    image: "",
  });
  // const handleShowDepositModal = (coinName: string) => {
  //   setSelectedToDeposit(coinName);
  // };

  const { balances, refetchBalances } = useBalances(
    AvailableCoinTypes,
    AvailableCoinDecimals
  );

  const { bottleInfo, refetchBottleInfo } = useMultiBottleInfo(60);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCreateBottleOpen,
    onOpen: onCreateBottleOpen,
    onClose: onCreateBottleClose,
  } = useDisclosure();

  // useEffect(() => {
  //   if (successBalances) {
  //     setWalletBalance(balances || []);
  //   }
  // }, [successBalances, balances]);

  // useEffect(() => {
  //   if (successBottleInfo) {
  //     setBottleInfos(bottleInfo);
  //   }
  // }, [successBottleInfo, bottleInfo]);

  useEffect(() => {
    setInnerHeight(window.innerHeight - 256);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      refetchBottleInfo();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      refetchBalances();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  });

  // const assetList = Object.keys(bottleInfo ?? {});

  // TODO: modify this
  const DepositCoins = [
    {
      name: "Injective",
      symbol: "INJ",
      image: "/inj.png",
      balance: 0,
      totalDeposited: Number(
        formatBigInt(
          BigInt(bottleInfo?.INJ?.collateralAmount ?? 0),
          bottleInfo?.INJ?.decimals ?? 0
        )
      ),
      coinPrice: oracleInfoList?.INJ ?? 1,
      debt: Number(formatBigInt(BigInt(bottleInfo?.INJ?.buckAmount ?? 0), 9)),
    },
    // {
    //   name: "Bitcoin",
    //   symbol: "WBTC",
    //   image: BtcLogo,
    //   balance: 3000,
    //   totalDeposited: Number(
    //     formatBigInt(
    //       BigInt(bottleInfos?.WBTC?.collateralAmount ?? 0),
    //       bottleInfos?.WBTC?.decimals ?? 0
    //     )
    //   ),
    //   coinPrice: oracleInfoList?.WBTC ?? 1,
    //   debt: Number(formatBigInt(BigInt(bottleInfos?.WBTC?.buckAmount ?? 0), 9)),
    // },
    // {
    //   name: "Ethereum",
    //   symbol: "WETH",
    //   image: EthLogo,
    //   balance: 5700,
    //   totalDeposited: Number(
    //     formatBigInt(
    //       BigInt(bottleInfos?.WETH?.collateralAmount ?? 0),
    //       bottleInfos?.WETH?.decimals ?? 0
    //     )
    //   ),
    //   coinPrice: oracleInfoList?.WETH ?? 1,
    //   debt: Number(formatBigInt(BigInt(bottleInfos?.WETH?.buckAmount ?? 0), 9)),
    // },
    {
      name: "USDT",
      symbol: "USDT",
      image: UsdtLogo,
      balance: 100,
      totalDeposited: Number(
        formatBigInt(
          BigInt(bottleInfo?.USDT?.collateralAmount ?? 0),
          bottleInfo?.USDT?.decimals ?? 0
        )
      ),
      coinPrice: oracleInfoList?.USDT ?? 1,
      debt: Number(formatBigInt(BigInt(bottleInfo?.USDT?.buckAmount ?? 0), 9)),
    },
    {
      name: "USDC",
      symbol: "USDC",
      image: UsdcLogo,
      balance: 5700,
      totalDeposited: Number(
        formatBigInt(
          BigInt(bottleInfo?.USDC?.collateralAmount ?? 0),
          bottleInfo?.USDC?.decimals ?? 0
        )
      ),
      coinPrice: oracleInfoList?.USDC ?? 1,
      debt: Number(formatBigInt(BigInt(bottleInfo?.USDC?.buckAmount ?? 0), 9)),
    },
  ];

  const tabList = [
    "Assets",
    "Wallet Balance",
    "Total Collateral",
    "Collateral Ratio",
    "Debt",
  ];

  return (
    <div className={cn("my-[-40px] bg-blue-100 pt-8 text-black lg:pt-20")}>
      <div className="w-full px-8 text-black lg:px-[100px]">
        <div className="flex flex-col justify-between lg:flex-row lg:items-center">
          <div className="mb-4 text-2xl font-bold lg:mb-0">Create Position</div>
          {/* <SearchBar /> */}
        </div>
        <div className="hidden items-center pt-6 text-center text-xs md:grid md:grid-cols-6 lg:grid-cols-6">
          {tabList.map((title) => (
            <div
              key={title}
              className={`${title === "Assets" ? "text-left" : ""}`}
            >
              {title}
            </div>
          ))}
        </div>
        {DepositCoins.map((DepositCoin, index) => (
          <div
            key={index}
            className={`${
              DepositCoins.length === index + 1
                ? ""
                : "border-gray-700 border-b-[0.5px]"
            }
                grid items-center space-y-2 py-5 md:grid-cols-6 md:space-y-0 lg:grid-cols-6`}
          >
            <div className="flex items-center justify-start">
              <Image
                src={DepositCoin.image}
                alt={`${DepositCoin.name} Logo Desktop`}
                height={40}
                width={40}
                className="h-10 w-10 rounded-full"
                priority
              />
              <div className="ml-4">
                <div className="font-bold">{DepositCoin.name}</div>
                <div className="text-gray-400 text-xs">
                  {DepositCoin.symbol}
                </div>
              </div>
            </div>

            <DataColumn
              title="Wallet Balance"
              value={balances ? balances[index]?.toFixed(2) : 0}
              estimatedValue={`$${
                balances
                  ? Number(
                      ((balances[index] || 0) * DepositCoin.coinPrice).toFixed(
                        0
                      )
                    ).toLocaleString("en")
                  : "0"
              }`}
            />

            <DataColumn
              title="Total Collateral"
              value={DepositCoin.totalDeposited.toLocaleString("en")}
              estimatedValue={`$${
                balances
                  ? Number(
                      (
                        DepositCoin.totalDeposited * DepositCoin.coinPrice
                      ).toFixed(0)
                    ).toLocaleString("en")
                  : "0"
              }`}
            />

            <DataColumn
              title="Collateral Ratio"
              value={
                DepositCoin.debt > 0
                  ? `${(
                      ((DepositCoin.totalDeposited * DepositCoin.coinPrice) /
                        DepositCoin.debt) *
                      100
                    ).toFixed(2)} %`
                  : "0 %"
              }
            />

            <DataColumn
              title="Debt"
              value={DepositCoin.debt.toLocaleString("en")}
            />

            <div className="flex items-end justify-center md:flex-col md:justify-center md:space-y-1 md:space-x-0">
              <div>
                {DepositCoin.totalDeposited > 0 ? (
                  <motion.button
                    className={`${
                      connected
                        ? "action-button font-semibold"
                        : "disabled-action-button font-semibold"
                    }`}
                    onClick={(_) => {
                      setSelectedToDeposit({
                        symbol: DepositCoin.symbol,
                        image: DepositCoin.image,
                      });
                      onOpen();
                    }}
                    disabled={!connected}
                  >
                    Manage
                  </motion.button>
                ) : (
                  <motion.button
                    className={`${
                      connected
                        ? "action-button font-semibold"
                        : "disabled-action-button font-semibold"
                    }`}
                    onClick={(_) => {
                      setSelectedToDeposit({
                        symbol: DepositCoin.symbol,
                        image: DepositCoin.image,
                      });
                      onCreateBottleOpen();
                    }}
                    disabled={!connected}
                  >
                    Create
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="h-0 md:h-25"></div>
      </div>
      <BottleModal
        isOpen={isOpen}
        onClose={onClose}
        coinSymbol={selectedToDeposit.symbol}
        coinImage={selectedToDeposit.image}
        bucketInfo={bucketInfo}
        oracleInfoList={oracleInfoList}
      />
      <DepositModal
        isOpen={isCreateBottleOpen}
        onOpen={onCreateBottleOpen}
        onClose={onCreateBottleClose}
        coinSymbol={selectedToDeposit.symbol}
        coinImage={selectedToDeposit.image}
        totalBucketData={bucketInfo ?? {}}
        loadingBucketInfo={loadingBucketInfo}
        oracleInfoList={oracleInfoList}
      />
    </div>
  );
};

export default Bottle;
