import { useEffect, useState } from "react";
import { type TokenDepositInfo } from "types";
import { COIN_TYPE } from "~/lib/utils/inj/constants";
import type { UseDisclosureProps } from "~/lib/hooks/useDisclosure";
import { cn } from "~/lib/utils/cn";
import { Button } from "../ui/Button";
import Image from "next/image";
import useTankTx from "~/lib/hooks/useTankTx";
import FormatNumber from "../Formats/formatNumber";
import useMultiTankInfo from "~/lib/hooks/useMultiTankInfo";
import useMultiTank from "~/lib/hooks/useMultiTank";
import useTankInfo from "~/lib/hooks/useTankInfo";
import useTokenBalance from "~/lib/hooks/useTokenBalance";
import useTankWithdraw from "~/lib/hooks/Tank/useTankWithdraw";
import CustomInputLabel from "./CustomInputLabel";
import CustomInput from "./CustomInput";
import { EVENTS } from "~/lib/utils/constants";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

type TankWithdrawProps = UseDisclosureProps & {
  tankType: string;
  name: string;
  coinImg: string;
  tankBuckBalance: number;
  isTankBuckBalanceLoading: boolean;
  earnInfo: number;
  isEarnLoading: boolean;
};

const { BUCK } = COIN_TYPE;

const TankWithdraw = (props: TankWithdrawProps) => {
  const {
    tankType,
    name,
    coinImg,
    tankBuckBalance,
    isTankBuckBalanceLoading,
    earnInfo,
    isEarnLoading,
    onClose,
  } = props;
  const [loading, setLoading] = useState(false);
  const [amountToWithdraw, setAmountToWithdraw] = useState(0);
  const { withdraw } = useTankWithdraw(name, tankType, amountToWithdraw);

  const handleWithdraw = async () => {
    if (!amountToWithdraw) {
      toast.error("Enter an amount");
      return;
    }
    setLoading(true);
    await withdraw(name, tankType, amountToWithdraw)
      .then(() => {
        setLoading(false);
        onClose?.();
      })
      .catch(() => {
        setLoading(false);
      });
  };
  // useEffect(() => {
  //   if (successWithdraw) {
  //     // eslint-disable-next-line @typescript-eslint/no-floating-promises
  //     onClose?.();
  //   }
  // }, [successWithdraw]);

  // const { borrow } = useBucket();

  // const tokenInfo: TokenDepositInfo = {
  //   tokenName: "BUCK",
  //   depositBalance: 10000,
  // };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountToWithdraw(Number(event.target.value));
  };

  const handleSetQuarter = () => {
    setAmountToWithdraw(tankBuckBalance / 4);
  };

  return (
    <div className="flex w-110 flex-col gap-4 p-10">
      <span className="flex w-full items-center justify-center text-3xl font-semibold text-black">
        {name} Tank
      </span>
      <div className="pt-2 text-center text-2xl font-bold">Withdraw</div>

      <div className="flex flex-col gap-4">
        <CustomInputLabel
          functionTitle=""
          title={`BUCK in ${name} Tank`}
          value={tankBuckBalance.toFixed(2)}
          symbol="BUCK"
        />
        <CustomInput
          onChange={handleChange}
          value={amountToWithdraw.toString()}
          onClick={handleSetQuarter}
          buttonTitle="25%"
          symbol="BUCK"
          src="/bucket-light.svg"
        />
      </div>
      <div className="pt-2 text-center text-2xl font-bold">Earned</div>
      <div className="mt-4 flex w-full items-center justify-between px-4">
        <span className={cn("text-2xl font-medium text-black")}>
          <FormatNumber
            number={earnInfo}
            isLoading={isEarnLoading}
            minFractionDigits={0}
            bgColor="bg-gray-light2 opacity-30"
            className="h-8 w-20 lg:h-10"
          />
        </span>
        <div className="flex w-29 items-center justify-between">
          <Image
            src={coinImg}
            alt={`${name} token logo`}
            width={36}
            height={36}
          />
          <span className="ml-3.5 text-2xl font-medium text-black">{name}</span>
        </div>
      </div>
      <div className="flex justify-center pt-5">
        <motion.button
          whileHover={{
            scale: 1.05,
            backgroundColor: "#FFF",
            color: "#3B82F6",
            border: "1px solid #3B82F6",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="block w-full rounded-lg bg-[#2E79DC] py-4 text-sm font-semibold text-white"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={() => handleWithdraw()}
        >
          {loading ? (
            <div role="status" className="flex justify-center">
              <svg
                aria-hidden="true"
                className="text-gray-200 dark:text-gray-600 mr-2 h-5 w-5 animate-spin fill-blue-600"
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
            "Withdraw and Claim"
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default TankWithdraw;
