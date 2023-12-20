/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { type StaticImageData } from "next/image";
import type { UseDisclosureProps } from "~/lib/hooks/useDisclosure";
import Deposit from "./Deposit";
import Borrow from "./Borrow";
import Repay from "./Repay";
// import Withdraw from "./Repay";
import Redeem from "./Redeem";
import ModalContainer from "../Layout/ModalContainer";
import type { PriceList } from "~/lib/utils/inj/oracle/getMultiAggregatorInfo";
import useMultiBottleInfo from "~/lib/hooks/useMultiBottleInfo";
import { formatBigInt } from "~/lib/utils/unit";
import type { BucketList } from "~/lib/utils/inj/bucket/getMultiBucketInfo";

type Props = UseDisclosureProps & {
  coinSymbol: string;
  coinImage: StaticImageData | string;
  oracleInfoList: PriceList;
  bucketInfo: BucketList;
};

const TABS = {
  DEPOSIT: "Deposit",
  BORROW: "Borrow",
  REPAY: "Repay",
};

const BottleModal = (props: Props) => {
  const [totalTvl, setTotalTvl] = useState(0);
  const [totalCollateralRatio, setTotalCollateralRatio] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);
  const { isOpen } = props;
  const [activeTab, setActiveTab] = useState(TABS.DEPOSIT);
  const {
    bottleInfo: multiBottleInfo,
    loadingBottleInfo: loadingMultiBottleInfo,
  } = useMultiBottleInfo(60);

  const assetList = Object.keys(multiBottleInfo ?? {});
  const userBottleTVLList = Object.values(multiBottleInfo ?? {}).map(
    (bottle, index) => {
      const assestPrice = props.oracleInfoList[assetList[index] as string] ?? 0;
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

  useEffect(() => {
    if (!multiBottleInfo) return;
    setTotalTvl(userBottleTVLList.reduce((a, b) => a + b, 0));
    setTotalDebt(userBottleDebtList.reduce((a, b) => a + b, 0));
    // setTotalBottle(bucketData.totalBottle);
  }, [multiBottleInfo]);

  useEffect(() => {
    if (!totalDebt) return;
    setTotalCollateralRatio((totalTvl / totalDebt) * 100);
  }, [totalTvl, totalDebt]);

  const renderComponent = () => {
    if (activeTab === TABS.DEPOSIT) {
      return (
        <Deposit
          {...props}
          multiBottleInfo={multiBottleInfo ?? {}}
          loadingMultiBottleInfo={loadingMultiBottleInfo}
          totalCollateralRatio={totalCollateralRatio}
        />
      );
    }
    if (activeTab === TABS.BORROW) {
      return (
        <Borrow
          {...props}
          multiBottleInfo={multiBottleInfo ?? {}}
          loadingMultiBottleInfo={loadingMultiBottleInfo}
        />
      );
    }
    if (activeTab === TABS.REPAY) {
      return (
        <Repay
          {...props}
          multiBottleInfo={multiBottleInfo ?? {}}
          loadingMultiBottleInfo={loadingMultiBottleInfo}
        />
      );
    }
    // if (activeTab === TABS.REDEEM) {
    //   return <Redeem {...props} coinSymbol="INJ" />;
    // }
  };

  if (!isOpen) {
    return <></>;
  }

  return (
    <ModalContainer {...props} showCloseButton={false} top="top-[10%]">
      <div className="flex">
        {Object.values(TABS).map((tab) => (
          <button
            key={tab}
            className={`w-[34%] px-7 py-5 text-base font-medium leading-5 ${
              tab === activeTab
                ? "border-t-[5px] border-[#2E79DC] bg-white pt-[15px]"
                : "bg-[#f0f0f0] "
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-8 pb-11">{renderComponent()}</div>
    </ModalContainer>
  );
};

export default BottleModal;
