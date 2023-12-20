import { cn } from "~/lib/utils/cn";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import useDisclosure from "~/lib/hooks/useDisclosure";
import TankDepositModal from "../Modals/TankDepositModal";
import TankWithdrawModal from "../Modals/TankWithdrawModal";
import { MARKET_COINS_TYPE_LIST, ACCEPT_ASSETS } from "~/lib/utils/constants";
import useTankInfo from "~/lib/hooks/useTankInfo";
import FormatNumber from "../Formats/formatNumber";
import { ta } from "date-fns/locale";
import { motion } from "framer-motion";
import useInjWallet from "~/lib/hooks/useInjWallet";

type TankInfo = {
  id: string;
  name: string;
  img: string;
};

interface TankCardProps {
  tankInfo: TankInfo;
  earnInfo: number;
  isEarnLoading: boolean;
}

const TankCard = ({ tankInfo, earnInfo, isEarnLoading }: TankCardProps) => {
  const wallet = useInjWallet();
  const {
    isOpen: isWithdrawModalOpen,
    onOpen: onWithdrawModalOpen,
    onClose: onWithdrawModalClose,
  } = useDisclosure();
  const {
    isOpen: isDepositModalOpen,
    onOpen: onDepositModalOpen,
    onClose: onDepositModalClose,
  } = useDisclosure();
  const { id, name, img } = tankInfo;
  // const [buckInTank, setBuckInTank] = useState(0);

  const tankType = MARKET_COINS_TYPE_LIST[name as ACCEPT_ASSETS] ?? "";

  const {
    tankInfoData,
    refetchTankInfoData,
    loadingTankInfoData,
    successTankInfoData,
  } = useTankInfo(tankType);

  // useEffect(() => {
  //   if (!successTankInfoData) return;
  //   if (successTankInfoData) {
  //     setBuckInTank(tankInfoData ?? 0);
  //   }
  // }, [successTankInfoData, tankInfoData]);

  useEffect(() => {
    const interval = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      refetchTankInfoData();
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <>
      <div className="relative flex w-113 flex-col justify-between gap-8 rounded-2.5 border-[0.5px] border-primary-default bg-black py-8 px-10 lg:h-82.5 lg:gap-11.5">
        <div className={cn("mt-1 flex w-full items-center")}>
          <Image
            src={img}
            alt={`${id} tank logo`}
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="ml-3.25 text-xl font-medium tracking-[1px] text-white">
            {name} Tank
          </span>
        </div>
        <div className="flex w-full flex-col justify-between gap-3 lg:flex-row lg:gap-0">
          <div className="flex items-end justify-between lg:w-[43%] lg:flex-col lg:items-start">
            <span className="text-xl font-medium text-white">Deposited</span>
            <div className="flex items-end gap-2 lg:mt-4 lg:w-full lg:justify-between lg:gap-0">
              <span className="text-2xl font-medium leading-7 text-white lg:text-2xl">
                <FormatNumber
                  number={tankInfoData ?? 0}
                  isLoading={
                    loadingTankInfoData ??
                    (!wallet.connected && !wallet.address)
                  }
                  minFractionDigits={0}
                  bgColor="bg-gray-light2 opacity-30"
                  className="h-8 w-20 lg:h-10 "
                />
              </span>
              <span className="text-md text-right font-medium text-white lg:text-xl">
                BUCK
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between lg:w-[43%] lg:flex-col lg:items-start ">
            <span className="text-xl font-medium text-white">Earned</span>
            <div className="flex items-end gap-2 lg:mt-4 lg:w-full lg:justify-between lg:gap-0">
              <span className="text-2xl font-medium leading-7 text-white lg:text-2xl">
                <FormatNumber
                  number={earnInfo}
                  isLoading={
                    isEarnLoading ?? (!wallet.connected && !wallet.address)
                  }
                  minFractionDigits={0}
                  bgColor="bg-gray-light2 opacity-30"
                  className="h-8 w-20 lg:h-10"
                />
              </span>
              <span className="text-md text-right font-medium text-white lg:text-xl">
                {name}
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-4 lg:h-10.5 lg:flex-row lg:gap-0">
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
            onClick={onDepositModalOpen}
            disabled={!wallet.connected && !wallet.address}
          >
            Deposit
          </motion.button>
          <div className="flex w-full flex-col items-center justify-between lg:w-auto">
            <motion.button
              whileHover={{
                scale: 1.1,
                backgroundColor: "#FFF",
                color: "#3B86E0",
                border: "1px solid #3B86E0",
                cursor: "pointer",
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="h-10.5 w-full rounded-2.5 bg-primary-default text-lg font-medium text-white lg:w-31.25"
              onClick={onWithdrawModalOpen}
              disabled={
                (!wallet.connected && !wallet.address) ?? tankInfoData === 0
              }
            >
              Withdraw
            </motion.button>
            {/* <Button
              type="secondary"
              className="h-10.5 w-[48%] lg:ml-5.5 lg:w-31.25"
              // onClick={}
            >
              Claim
            </Button> */}
          </div>
        </div>
      </div>
      <TankDepositModal
        isOpen={isDepositModalOpen}
        onOpen={onDepositModalOpen}
        onClose={onDepositModalClose}
        tankType={tankType}
        name={name}
      />
      <TankWithdrawModal
        isOpen={isWithdrawModalOpen}
        onOpen={onWithdrawModalOpen}
        onClose={onWithdrawModalClose}
        tankType={tankType}
        name={name}
        coinImg={img}
        tankBuckBalance={tankInfoData ?? 0}
        isTankBuckBalanceLoading={loadingTankInfoData}
        earnInfo={earnInfo}
        isEarnLoading={isEarnLoading}
      />
    </>
  );
};

export default TankCard;
