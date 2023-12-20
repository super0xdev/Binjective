import { type StaticImageData } from "next/image";
import { cn } from "~/lib/utils/cn";
import { useEffect, useState } from "react";
import useBalances from "~/lib/hooks/useBalances";
import type { UseDisclosureProps } from "~/lib/hooks/useDisclosure";
import { COIN_TYPE } from "~/lib/utils/inj/constants";
import CustomInput from "./CustomInput";
import CustomInputLabel from "./CustomInputLabel";
import FormatNumber from "../Formats/formatNumber";
import { formatBigInt } from "~/lib/utils/unit";
import type { PriceList } from "~/lib/utils/inj/oracle/getMultiAggregatorInfo";
import type { BottleAmountsList } from "~/lib/utils/inj/bottle/getMultiBottleInfo";
import FormatBigNumber from "../Formats/formatBigNumber";
import useMultiBottleInfo from "~/lib/hooks/useMultiBottleInfo";
import useRepay from "~/lib/hooks/Bucket/useRepay";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import type { BucketList } from "~/lib/utils/inj/bucket/getMultiBucketInfo";

type RepayProps = UseDisclosureProps & {
  coinSymbol: string;
  coinImage: StaticImageData | string;
  oracleInfoList: PriceList;
  multiBottleInfo: BottleAmountsList;
  loadingMultiBottleInfo: boolean;
  bucketInfo: BucketList;
};

const Repay = (props: RepayProps) => {
  const {
    coinSymbol,
    coinImage,
    onClose,
    oracleInfoList,
    multiBottleInfo,
    loadingMultiBottleInfo,
    bucketInfo,
  } = props;

  const [amountToRepay, setAmountToRepay] = useState(0);
  const [amountToWithdraw, setAmountToWithdraw] = useState(0);
  const { balances } = useBalances([COIN_TYPE.BUCK], [9]);
  const userBalance = (balances && balances[0]) || 0;
  const [loading, setLoading] = useState(false);
  const userDebt = Number(
    formatBigInt(BigInt(multiBottleInfo?.[coinSymbol]?.buckAmount ?? 0), 9)
  );

  const minCR = bucketInfo?.[coinSymbol]?.minCollateralRatio;

  const isInsufficientBalance =
    balances !== undefined && amountToRepay > userBalance;
  const { executeRepay, loadingRepay, errorRepay, successRepay, repay } =
    useRepay(coinSymbol, amountToRepay, amountToWithdraw);
  const [td, setTd] = useState("");
  const [cr, setCr] = useState("");
  const [newCr, setNewCr] = useState("");

  const { refetchBottleInfo } = useMultiBottleInfo(60);

  useEffect(() => {
    const collateralAmount = Number(
      formatBigInt(
        BigInt(multiBottleInfo?.[coinSymbol]?.collateralAmount ?? 0),
        multiBottleInfo?.[coinSymbol]?.decimals ?? 0
      )
    );
    const coinPrice = oracleInfoList?.[coinSymbol] ?? 1;
    const debt =
      Number(
        formatBigInt(BigInt(multiBottleInfo?.[coinSymbol]?.buckAmount ?? 1), 9)
      ) - amountToRepay;
    // const totalDeposited = collateralAmount * coinPrice;
    const totalCollaterRatio =
      (((collateralAmount - amountToWithdraw) * coinPrice) / debt) * 100;
    setTd(collateralAmount.toString());
    setCr(totalCollaterRatio.toString());
  }, [
    oracleInfoList,
    coinSymbol,
    multiBottleInfo,
    amountToWithdraw,
    amountToRepay,
  ]);

  // useEffect(() => {
  //   if (successRepay) {
  //     onClose?.();
  //   }
  // }, [successRepay]);

  const handleRepayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountToRepay(Number(event.target.value));
  };
  const handleWithdrawChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountToWithdraw(Number(event.target.value));
  };

  const handleSetMaxRepay = () => {
    if (!loadingMultiBottleInfo) {
      const userDebt = Number(
        formatBigInt(BigInt(multiBottleInfo?.[coinSymbol]?.buckAmount ?? 0), 9)
      );
      setAmountToRepay(userDebt);
    }
  };

  const handleRepay = async () => {
    if (isInsufficientBalance) {
      toast.error("Insufficient Balance");
      return;
    }
    if (amountToRepay <= 0) {
      toast.error("Enter an amount");
      return;
    }
    if (0 < userDebt - amountToRepay && userDebt - amountToRepay < 10) {
      toast.warning("Your debt must be either 0 or at least 10 BUCK.");
      return;
    }
    if (Number(cr) < Number(minCR)) {
      toast.error("Collateral ratio is below minimum.");
      return;
    }
    setLoading(true);
    await repay().then(() => {
      setLoading(false);
      onClose?.();
    });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Repay Section */}
      <div className="flex flex-col gap-1">
        <CustomInputLabel
          functionTitle="Repay Amount"
          title="Wallet Balance"
          value={userBalance.toFixed(2)}
          symbol="BUCK"
        />
        <CustomInput
          onChange={handleRepayChange}
          value={amountToRepay}
          buttonTitle="Max"
          symbol="BUCK"
          src="/bucket-light.svg"
          onClick={handleSetMaxRepay}
        />
      </div>
      {/* Withdraw Section */}
      {/* <div className="flex flex-col gap-1">
        <CustomInputLabel
          functionTitle="Withdraw Amount"
          title="Total Collateral"
          value={Number(td).toFixed(2).toString()}
          symbol={coinSymbol}
        />
        <CustomInput
          onChange={handleWithdrawChange}
          value={amountToWithdraw}
          buttonTitle="Max"
          symbol={coinSymbol}
          src={coinImage}
          onClick={handleSetMaxRepay}
          isSubButton={false}
        />
      </div> */}
      <div className="space-y-2 rounded-xl py-2 text-sm text-gray-light">
        <div className="flex justify-between">
          <div>Your Debt</div>
          <div className="flex items-center justify-between">
            <div className={cn("flex items-center justify-between gap-2")}>
              {/* {!loadingMultiBottleInfo ? ( */}
              <FormatNumber
                number={userDebt - amountToRepay}
                isLoading={loadingMultiBottleInfo}
                notation="standard"
                className="h-4 w-12 opacity-5"
                bgColor="bg-gray-light2"
              />
              {/* ) : (
                <span>0</span>
              )} */}
              {/* {amountToWithdraw > 0 && (
                <>
                  <BsArrowRight />
                  {!loadingMultiBottleInfo ? (
                    <FormatBigNumber
                      number={userDebt}
                      isLoading={loadingMultiBottleInfo}
                      notation="standard"
                      className="h-4 w-12 opacity-5"
                      bgColor="bg-gray-light2"
                    />
                  ) : (
                    <span>0</span>
                  )}
                </>
              )} */}
            </div>
            <span className="ml-1">BUCK</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div>Collateral Ratio</div>
          <div className="flex items-center justify-between">
            <div className={cn("flex items-center justify-between gap-2")}>
              <>
                {/* {!loadingMultiBottleInfo ? ( */}
                <FormatNumber
                  number={cr}
                  isLoading={loadingMultiBottleInfo}
                  notation="standard"
                  className="h-4 w-12 opacity-5"
                  bgColor="bg-gray-light2"
                />
                {/* ) : (
                  <span>-/-</span>
                )} */}
                <span>%</span>
              </>
              {/* {amountToWithdraw > 0 && (
                <>
                  <BsArrowRight />
                  <>
                    {!loadingMultiBottleInfo ? (
                      <FormatNumber
                        number={cr}
                        isLoading={loadingMultiBottleInfo}
                        notation="standard"
                        className="h-4 w-12 opacity-5"
                        bgColor="bg-gray-light2"
                      />
                    ) : (
                      <span>-/-</span>
                    )}
                    <span>%</span>
                  </>
                </>
              )} */}
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div>Market Price</div>
          <div className="flex items-center justify-between">
            <span>$ 1.00 USD</span>
          </div>
        </div>
      </div>
      <motion.button
        whileHover={{
          scale: 1.05,
          backgroundColor: "#FFF",
          color: "#3B82F6",
          border: "1px solid #3B82F6",
        }}
        disabled={isInsufficientBalance}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "block rounded-lg py-4 text-sm font-medium text-white disabled:cursor-not-allowed",
          isInsufficientBalance || Number(cr) < Number(minCR)
            ? "bg-red-600"
            : "bg-[#2E79DC]"
        )}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={() => handleRepay()}
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
        ) : balances !== undefined && amountToRepay > userBalance ? (
          "Insufficient Balance"
        ) : Number(cr) < Number(minCR) ? (
          "Collateral Ratio Too Low"
        ) : (
          "Repay"
        )}
      </motion.button>
    </div>
  );
};

export default Repay;
