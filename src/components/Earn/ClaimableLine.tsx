import { cn } from "~/lib/utils/cn";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import useDisclosure from "~/lib/hooks/useDisclosure";
import TankDepositModal from "../Modals/TankDepositModal";
import TankWithdrawModal from "../Modals/TankWithdrawModal";
import { MARKET_COINS_TYPE_LIST } from "~/lib/utils/constants";
import useTankInfo from "~/lib/hooks/useTankInfo";
import FormatNumber from "../Formats/formatNumber";
import { ta } from "date-fns/locale";
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

const ClaimableLine = ({
  tankInfo,
  earnInfo,
  isEarnLoading,
}: TankCardProps) => {
  const wallet = useInjWallet();
  const { id, name, img } = tankInfo;
  // const [buckInTank, setBuckInTank] = useState(0);

  // useEffect(() => {
  //   if (!successTankInfoData) return;
  //   if (successTankInfoData) {
  //     setBuckInTank(tankInfoData ?? 0);
  //   }
  // }, [successTankInfoData, tankInfoData]);

  return (
    <div className="flex flex-col items-center space-y-5">
      <div className={cn("mt-1 flex items-center space-x-2")}>
        <Image
          src={img}
          alt={`${id} tank logo`}
          width={30}
          height={30}
          className="rounded-full"
        />
        <span className="text-xl font-medium tracking-[1px] text-white">
          {name}
        </span>
      </div>
      <div className="">
        <span className="text-xl font-medium leading-7 text-white lg:text-xl">
          <FormatNumber
            number={earnInfo}
            isLoading={isEarnLoading ?? (!wallet.connected && !wallet.address)}
            minFractionDigits={0}
            bgColor="bg-gray-light2 opacity-30"
            className="h-8 w-20 lg:h-10"
          />
        </span>
        {/* <span className="text-md text-right font-medium text-black lg:text-xl">
          {name}
        </span> */}
      </div>
    </div>
  );
};

export default ClaimableLine;
