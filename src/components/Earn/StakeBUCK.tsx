/* eslint-disable @typescript-eslint/no-misused-promises */
import Image, { type StaticImageData } from "next/image";
import React from "react";
import BUCKLOGO from "../../../public/buck-icon.png";
import { motion } from "framer-motion";
import InfoPopover from "../Layout/InfoPopover";
import useBalances from "~/lib/hooks/useBalances";
import { COIN_TYPE } from "~/lib/utils/inj/constants";

type StakeBUCKInfo = {
  name: string;
  image: StaticImageData;
  stakingAPR: number;
  maxSlashing: number;
  balance: number;
};

const StakeBUCK = () => {
  const StakeBUCKInfo: StakeBUCKInfo = {
    name: "BUCK",
    image: BUCKLOGO,
    stakingAPR: 5,
    maxSlashing: 30.0,
    balance: 0,
  };

  const { balances, loadingBalances } = useBalances([COIN_TYPE.BUCK], [9]);

  return (
    <div className="rounded-xl bg-white pr-[2px] pb-2">
      <div className="ml-[-4px] mt-[-4px] h-auto w-full rounded-lg border bg-black">
        <div className="p-4">
          <div className="text-2xl font-bold">Deposit BUCK</div>
          <div className="rounded-lg md:mt-2 md:border">
            <div className="grid items-center space-y-2 pt-3 md:grid-cols-4 md:pt-0">
              <div className="flex items-center justify-start space-x-2 md:justify-center xl:ml-[-10px]">
                <Image
                  src={StakeBUCKInfo.image}
                  alt={`${StakeBUCKInfo.name} Logo`}
                  height={40}
                  width={40}
                  className="h-auto w-auto rounded-full md:hidden"
                  priority
                />
                <Image
                  src={StakeBUCKInfo.image}
                  alt={`${StakeBUCKInfo.name} Logo`}
                  height={30}
                  width={30}
                  className="hidden h-auto w-auto rounded-full md:flex"
                  priority
                />
                <div className="font-bold">{StakeBUCKInfo.name}</div>
              </div>
              <div className="flex items-center justify-between md:flex-col md:items-center">
                <div className="md:text-xs">Staking APR</div>
                <div className="text-center">
                  {StakeBUCKInfo.stakingAPR}{" "}
                  <span className="text-gray-400">%</span>
                </div>
              </div>
              {/* <div className="flex items-center justify-between md:flex-col md:items-center">
                <div className="md:text-xs">Max slashing</div>
                <div className="">
                  {StakeBUCKInfo.maxSlashing}{" "}
                  <span className="text-gray-400">%</span>
                </div>
              </div> */}
              <div className="flex items-center justify-between md:flex-col md:items-center">
                <div className="md:text-xs">Wallet Balance</div>
                <div className="">{(balances && balances[0]) || 0}</div>
              </div>
              <div className="flex justify-center pt-2 md:pb-2 md:pt-0 md:pr-2">
                <motion.button className="action-button">Deposit</motion.button>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 text-center md:grid md:grid-cols-2 md:space-y-0 md:space-x-4">
            <div className="rounded-lg border pt-2">
              <div>BUCK in Tank</div>
              <div className="text-xl">0</div>
              <div className="text-sm">$0</div>
              {/* <div className="p-2">
                <motion.button className="action-button-big">
                  Deposit
                </motion.button>
              </div> */}
              <div className="p-2">
                <motion.button className="action-button-big">
                  Withdraw
                </motion.button>
              </div>
              {/* <div className="flex justify-between px-2 py-2">
                <InfoPopover
                  title="cooldown period"
                  description="You can only withdraw your assets from the Security Module
                      after the cooldown period ends and the unstake window is
                      active."
                />
                <div>10d</div>
              </div> */}
            </div>
            <div className="rounded-lg border pt-2">
              <div>Claim BUCK</div>
              <div className="text-xl">0</div>
              <div className="text-sm">$0</div>
              <div className="p-2">
                <motion.button className="action-button-big">
                  Claim BUCK
                </motion.button>
              </div>
              <div className="p-2">
                <motion.button className="action-button-big">
                  Claim ALL
                </motion.button>
              </div>
              {/* <div className="flex items-center justify-between px-2 py-2">
                <div className="text-center text-sm">BUCK per month</div>
                <div>0</div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeBUCK;
