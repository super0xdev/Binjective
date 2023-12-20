import React, { useEffect, useState } from "react";
import { BsShieldCheck } from "react-icons/bs";
import { AiOutlineGift } from "react-icons/ai";
import Link from "next/link";
import { cn } from "~/lib/utils/cn";
import { Button } from "../ui/Button";
import { type TankList } from "~/lib/utils/inj/tank/getMultiTankInfo";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/router";
import FormatNumber from "../Formats/formatNumber";
import { motion } from "framer-motion";

interface InfoProps {
  tankInfoList: TankList | undefined;
  isTankInfoLoading: boolean;
  setTab: (tab: number) => void;
}

const Info = ({ tankInfoList, isTankInfoLoading, setTab }: InfoProps) => {
  const router = useRouter();
  const [tankTVL, setTankTVL] = useState(0);

  const handleLinkToDeposit = () => {
    setTab(0);
    void router.push("/earn/#tank");
  };

  useEffect(() => {
    if (!tankInfoList) setTankTVL(0);
    else {
      let total = 0;
      Object.values(tankInfoList).forEach((tankInfo) => {
        total += parseFloat(tankInfo.buckReserve);
      });
      setTankTVL(Number((total / 10 ** 9).toFixed(2)));
    }
  }, [tankInfoList]);

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[84rem] px-8 pt-15 lg:px-28 2xl:px-7"
      )}
    >
      <div
        className={cn(
          "w-full items-center justify-between py-16 lg:flex lg:py-24"
        )}
      >
        <span className={cn("text-6.5xl font-black text-white")}>Earn</span>
        <div
          className={cn(
            "mt-12 items-center justify-between lg:mt-0 lg:flex lg:space-x-18"
          )}
        >
          <div className={cn("lg:p-4")}>
            <div className={cn("flex w-full items-center justify-start gap-4")}>
              <BsShieldCheck size={18} />
              <div className="text-xl font-medium text-white">
                Total Tank TVL
              </div>
            </div>
            <div className="flex items-center justify-start gap-2 text-3xl-32 font-semibold">
              <span>$</span>
              <FormatNumber
                number={tankTVL}
                isLoading={isTankInfoLoading}
                className="h-10 w-48 bg-gray-light3 opacity-5"
                notation="standard"
                minFractionDigits={0}
              />
            </div>
          </div>
          <div className={cn("mt-6 lg:mt-0 lg:p-4")}>
            <div className={cn("flex w-full items-center justify-start gap-4")}>
              <AiOutlineGift size={22} />
              <div className="text-xl font-medium text-white">
                DEX Liquidity
              </div>
            </div>
            <div className="text-3xl-32 font-semibold">Coming Soon</div>
          </div>
        </div>
      </div>
      <div className={cn("w-full")}>
        <div
          className={cn(
            "mt-12 flex w-full flex-col gap-12 lg:flex-row lg:items-start lg:justify-between"
          )}
        >
          <div className="lg:w-120">
            <span className="text-2xl font-bold lg:text-3xl-32 lg:font-medium">
              Deposit BUCK
            </span>
            <p className="text-md mt-4 tracking-wider lg:mt-6 lg:text-xl">
              Earn rewards and buy INJ at a discount by depositing BUCK in Tank.
            </p>
            <motion.button
              whileHover={{
                scale: 1.1,
                backgroundColor: "#fff",
                border: "1px solid #2e79dc",
                color: "#2e79dc",
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="mt-5 h-[45px] w-[130px] rounded-xl bg-[#2e79dc] font-semibold"
              onClick={handleLinkToDeposit}
            >
              Deposit
            </motion.button>
          </div>
          <div className="lg:w-120">
            <span className="text-2xl font-bold lg:text-3xl-32 lg:font-medium">
              DEX Liquidity
            </span>
            <p className="text-md mt-4 tracking-wider lg:mt-6 lg:text-xl">
              Earn rewards by adding liquidity to DEX Pools and staking your LP
              tokens.
            </p>
            {/* <Link
              href="https://docs.bucketprotocol.io/mechanisms/bkt-and-stbkt"
              target="_blank"
            >
              <motion.button
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#fff",
                  border: "1px solid #2e79dc",
                  color: "#2e79dc",
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="mt-5 h-[45px] w-[130px] rounded-xl bg-[#2e79dc] font-semibold"
              >
                Read More
              </motion.button>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
