/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { type StaticImageData } from "next/image";
import useBucket from "~/lib/hooks/useBucket";
import { getBalance } from "~/lib/utils/inj/balances/getBalance";
import useBottleInfo from "~/lib/hooks/useBottleInfo";
import { COIN_TYPE } from "~/lib/utils/inj/constants";
import ModalContainer from "../Layout/ModalContainer";
import type { UseDisclosureProps } from "~/lib/hooks/useDisclosure";
import { MIN_BORROWED_DEBT, URLS } from "~/lib/utils/constants";
import CustomInput from "./CustomInput";
import CustomInputLabel from "./CustomInputLabel";
import BottleDetail from "./BottleDetail";
import {
  MARKET_COINS_TYPE_LIST,
  MARKET_COINS,
  ASSET_DECIAMLS,
  ACCEPT_ASSETS,
} from "~/lib/utils/constants";
import type { BucketList } from "~/lib/utils/inj/bucket/getMultiBucketInfo";
import OBJECTID from "~/lib/utils/objectIdMap";
import useMultiBucketInfo from "~/lib/hooks/useMultiBucketInfo";
import useMultiBottleInfo from "~/lib/hooks/useMultiBottleInfo";
import { formatBigInt } from "~/lib/utils/unit";
import type { PriceList } from "~/lib/utils/inj/oracle/getMultiAggregatorInfo";
import { toast } from "react-toastify";
import useBalances from "~/lib/hooks/useBalances";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = UseDisclosureProps & {
  coinSymbol: string;
  coinImage: StaticImageData | string;
  totalBucketData: BucketList;
  loadingBucketInfo: boolean;
  oracleInfoList: PriceList;
};

const REFETCH_SEC = 60;

const DepositModal = (props: Props) => {
  const {
    coinSymbol,
    coinImage,
    isOpen,
    onClose,
    totalBucketData,
    oracleInfoList,
  } = props;
  const [totalTvl, setTotalTvl] = useState(0);
  const [totalCollateralRatio, setTotalCollateralRatio] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);
  const [amountToDeposit, setAmountToDeposit] = useState("0");
  const [amountToBorrow, setAmountToBorrow] = useState("0");
  const [amountToDebt, setAmountToDebt] = useState<number>(0);
  const [callToAction, setCallToAction] = useState<boolean>(false);
  // const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const coinType = MARKET_COINS_TYPE_LIST[coinSymbol as ACCEPT_ASSETS] ?? "";
  const { balances } = useBalances(
    [coinType],
    [ASSET_DECIAMLS[coinSymbol as ACCEPT_ASSETS] ?? 9]
  );

  const balance = (balances && balances[0]) || 0;

  const {
    bottleInfo: multiBottleInfo,
    loadingBottleInfo: loadingMultiBottleInfo,
  } = useMultiBottleInfo(60);

  const assetList = Object.keys(multiBottleInfo ?? {});
  const userBottleTVLList = Object.values(multiBottleInfo ?? {}).map(
    (bottle, index) => {
      const assestPrice = oracleInfoList[assetList[index] as string] ?? 0;
      return (
        Number(
          formatBigInt(BigInt(bottle.collateralAmount ?? 0), bottle.decimals)
        ) * assestPrice
      );
    }
  );

  const userBottleDebtList = Object.values(multiBottleInfo ?? {}).map(
    (bottle) => Number(formatBigInt(BigInt(bottle.buckAmount ?? 0), 9))
  );

  const bucketData = totalBucketData && totalBucketData[coinSymbol];
  const { refetchTotalBucketInfo } = useMultiBucketInfo(REFETCH_SEC);

  const { borrow } = useBucket(coinSymbol);

  //todo query onchain borrow fee
  const borrowFee = 0.005;

  // useEffect(() => {
  //   if (Number(amountToDeposit) > balance) {
  //     if (coinSymbol === "INJ") {
  //       setAmountToDeposit((balance - 0.1).toString());
  //     } else {
  //       setAmountToDeposit(balance.toString());
  //     }
  //   }
  //   if (Number(amountToDeposit) < 0) {
  //     setAmountToDeposit("0");
  //   }
  // }, [amountToDeposit]);

  useEffect(() => {
    if (!multiBottleInfo) return;
    setTotalTvl(userBottleTVLList.reduce((a, b) => a + b, 0));
    setTotalDebt(userBottleDebtList.reduce((a, b) => a + b, 0));
    // setTotalBottle(bucketData.totalBottle);
  }, [multiBottleInfo]);

  useEffect(() => {
    if (!totalDebt) return;
    setTotalCollateralRatio(
      ((totalTvl + Number(amountToDeposit)) / (totalDebt + amountToDebt)) * 100
    );
  }, [totalTvl, totalDebt, amountToDeposit, amountToDebt]);

  const assetPrice =
    oracleInfoList !== undefined ? oracleInfoList[coinSymbol] ?? 1 : 1;

  const maxBorrowAmount =
    (Number(amountToDeposit) * assetPrice) /
    (1 + borrowFee) /
    (Number(bucketData?.minCollateralRatio || 100) / 100);

  const handleDepositChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountToDeposit(event.target.value);
  };

  const handleBorrowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountToBorrow(event.target.value);
    setAmountToDebt(Number(event.target.value) * (1 + borrowFee));
  };

  const handleSetMaxDeposit = () => {
    if (coinSymbol === "INJ") {
      setAmountToDeposit((balance - 0.1).toString());
      toast.info("0.1 $INJ is reserved for gas fee");
    } else {
      setAmountToDeposit(balance.toString());
    }
  };

  const handleSetHalfBorrow = () => {
    setAmountToBorrow((maxBorrowAmount / 2).toFixed(2));
    setAmountToDebt((maxBorrowAmount / 2) * (1 + borrowFee));
  };

  const isInvalidBorrowAmount =
    (Number(amountToBorrow) < 10 && Number(amountToBorrow) > 0) ||
    Number(amountToBorrow) > maxBorrowAmount;

  // TODO: use onclose props
  const resetModalData = () => {
    setAmountToDeposit("");
    setAmountToBorrow("");
    setAmountToDebt(0);
  };

  useEffect(() => {
    if (!isOpen) {
      resetModalData();
    }
  }, [isOpen]);

  const maxDebtAmount =
    (Number(amountToDeposit) * assetPrice) / (1 + borrowFee);

  const showBorrowErrorMessage = (amount: number) => {
    if (amount < 10 && amount > 0) {
      return "Minimum borrow is 10 BUCK.";
    }
    if (amount > maxBorrowAmount) {
      return "Exceeded maximum borrow amount";
    }
    return "";
  };

  if (!isOpen) {
    return <></>;
  }

  const bottleInfoList = [
    {
      id: "yd",
      title: "Your Debt",
      value: amountToDebt !== 0 ? `${amountToDebt.toFixed(2)}` : `0`,
      unit: "BUCK",
    },
    {
      id: "cr",
      title: "Collateral Ratio",
      value: `${
        amountToDebt !== 0
          ? (
              ((Number(amountToDeposit) * assetPrice) / amountToDebt) *
              100
            ).toFixed(0)
          : "-/-"
      }`,
      unit: "%",
    },
    // {
    //   id: "mcr",
    //   title: "Min Collateral Ratio",
    //   value: `${bucketData ? bucketData.minCollateralRatio : '-/-'}`,
    //   unit: '%',
    // },
    // {
    //   id: "mc",
    //   title: "Mint Cap",
    //   value: "100,000/2,500,000",
    // },
    {
      id: "bf",
      title: "Borrow Fee",
      value: `${(borrowFee * 100).toString()}`,
      unit: "%",
    },
    {
      id: "mbd",
      title: "Min Borrowed Debt",
      value: `${MIN_BORROWED_DEBT}`,
      unit: "BUCK",
    },
    {
      id: "rmt",
      title: "Recovery Mode Threshold",
      value: `${bucketData ? bucketData.recoveryModeThreshold : "-/-"}`,
      unit: "%",
    },
    // {
    //   id: "bcr",
    //   title: "Bucket Collateral Ratio",
    //   value: `${
    //     totalCollateralRatio ? totalCollateralRatio.toFixed(2) : "-/-"
    //   }`,
    //   unit: "%",
    // },
  ];

  return (
    <ModalContainer {...props}>
      <div className="w-full px-8">
        {callToAction ? (
          <div className="py-8">
            <p className="pb-8 text-center text-3xl font-bold tracking-wide">
              All set!
            </p>
            <p className="pb-12 text-center text-3xl font-bold tracking-wide">
              Now utilize your BUCK!
            </p>
            <Link href={"/earn#tank"}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className={
                  "block w-full rounded-lg bg-[#2E79DC] py-4 text-sm font-medium text-white"
                }
              >
                Deposit in Tank
              </motion.button>
            </Link>
            <div className="pt-8" />
            <Link
              href={
                "https://app.cetus.zone/deposit?poolAddress=0xd4573bdd25c629127d54c5671d72a0754ef47767e6c01758d6dc651f57951e7d&tokena=0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::BUCK&tokenb=0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN&fee=0.0001"
              }
            >
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className={
                  "block w-full rounded-lg bg-[#2E79DC] py-4 text-sm font-medium text-white"
                }
              >
                Add Liquidity to Pool
              </motion.button>
            </Link>
          </div>
        ) : (
          <div>
            <p className="py-8 text-center text-3xl font-bold tracking-wide">
              Create Position
            </p>
            <CustomInputLabel
              functionTitle="1. Deposit"
              title="Wallet Balance"
              value={balance}
              symbol={coinSymbol}
            />
            <CustomInput
              onChange={handleDepositChange}
              value={amountToDeposit.toString()}
              onClick={handleSetMaxDeposit}
              buttonTitle="Max"
              src={coinImage}
              symbol={coinSymbol}
            />
            <div className="h-4"></div>
            <CustomInputLabel
              functionTitle="2. Borrow"
              title="Max Borrow"
              value={maxBorrowAmount.toFixed(2)}
              symbol="BUCK"
            />
            <CustomInput
              className={`${
                isInvalidBorrowAmount ? "border-red-600" : "border-gray-light2"
              } relative my-2 flex items-center rounded-lg border px-2 py-1`}
              src="/bucket-light.svg"
              onChange={handleBorrowChange}
              value={amountToBorrow.toString()}
              onClick={handleSetHalfBorrow}
              buttonTitle="50%"
              symbol="BUCK"
            />
            <div
              className={`h-6 items-center ${
                isInvalidBorrowAmount ? "flex text-xs text-red-600" : ""
              }`}
            >
              {showBorrowErrorMessage(Number(amountToBorrow))}
            </div>

            <div className="space-y-2 rounded-xl py-2 text-sm text-gray-light">
              {bottleInfoList.map((bottleInfo) => (
                <BottleDetail
                  key={bottleInfo.id}
                  id={bottleInfo.id}
                  title={bottleInfo.title}
                  value={bottleInfo.value}
                  unit={bottleInfo.unit}
                  isLoading={false}
                />
              ))}
            </div>
            <div className="flex w-full flex-1 justify-center px-2 py-8 font-semibold">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#FFF",
                  color: "#3B82F6",
                  border: "1px solid #3B82F6",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="block w-full rounded-lg bg-primary-default py-4 text-sm font-medium text-white"
                onClick={async () => {
                  // toast.info("Coming Soon");
                  // return;
                  if (!Number(amountToDeposit)) {
                    toast.error("Enter borrow amount");
                    return;
                  }
                  if (!Number(amountToBorrow)) {
                    toast.error("Enter borrow amount");
                    return;
                  }
                  if (Number(amountToBorrow) < 10) {
                    toast.error("Minimum debt is 10 BUCK.");
                    return;
                  }
                  setLoading(true);
                  const res = await borrow();

                  setLoading(false);
                }}
              >
                {loading ? (
                  <div role="status" className="flex justify-center">
                    <svg
                      aria-hidden="true"
                      className="text-gray-200 dark:text-gray-600 h-6 w-6 animate-spin fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Create"
                )}
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </ModalContainer>
  );
};

export default DepositModal;
