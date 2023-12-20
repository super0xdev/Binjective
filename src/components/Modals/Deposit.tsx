import { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import useBucket from "~/lib/hooks/useBucket";
import type { UseDisclosureProps } from "~/lib/hooks/useDisclosure";
import { getBalance } from "~/lib/utils/inj/balances/getBalance";
import CustomInputLabel from "./CustomInputLabel";
import CustomInput from "./CustomInput";
import FormatNumber from "../Formats/formatNumber";
import type { PriceList } from "~/lib/utils/inj/oracle/getMultiAggregatorInfo";
import { formatBigInt } from "~/lib/utils/unit";
import useMultiBucketInfo from "~/lib/hooks/useMultiBucketInfo";
import { MARKET_COINS_TYPE_LIST, ACCEPT_ASSETS } from "~/lib/utils/constants";
import type { BottleAmountsList } from "~/lib/utils/inj/bottle/getMultiBottleInfo";
import useMultiBottleInfo from "~/lib/hooks/useMultiBottleInfo";
import { toast } from "react-toastify";
import useBorrow from "~/lib/hooks/Bucket/useBorrow";
import { motion } from "framer-motion";
import useInjWallet from "~/lib/hooks/useInjWallet";

type DepositProps = UseDisclosureProps & {
  coinSymbol: string;
  coinImage: StaticImageData | string;
  oracleInfoList: PriceList;
  multiBottleInfo: BottleAmountsList;
  loadingMultiBottleInfo: boolean;
  totalCollateralRatio: number;
};

const Deposit = (props: DepositProps) => {
  const {
    coinSymbol,
    coinImage,
    onClose,
    oracleInfoList,
    multiBottleInfo,
    loadingMultiBottleInfo,
    totalCollateralRatio,
  } = props;
  const [amountToDeposit, setAmountToDeposit] = useState("");
  // const { borrow } = useBucket(coinSymbol);
  const wallet = useInjWallet();
  const [balance, setBalance] = useState<number>(0);
  const [cr, setCr] = useState("");
  const [loading, setLoading] = useState(false);

  const { totalBucketData, refetchTotalBucketInfo, loadingTotalBucketInfo } =
    useMultiBucketInfo(60);
  const bucketData = totalBucketData?.[coinSymbol];
  const coinType = MARKET_COINS_TYPE_LIST[coinSymbol as ACCEPT_ASSETS] ?? "";

  const { borrow } = useBorrow(
    coinSymbol,
    coinType,
    Number(amountToDeposit),
    0
  );

  const mockLoading = false;

  // TODO: fix collateral
  useEffect(() => {
    const collateralAmount = Number(
      formatBigInt(
        BigInt(multiBottleInfo?.[coinSymbol]?.collateralAmount ?? 0),
        multiBottleInfo?.[coinSymbol]?.decimals ?? 0
      )
    );
    const coinPrice = oracleInfoList?.[coinSymbol] ?? 1;
    const debt = Number(
      formatBigInt(BigInt(multiBottleInfo?.[coinSymbol]?.buckAmount ?? 1), 9)
    );
    const totalCollaterRatio = ((collateralAmount * coinPrice) / debt) * 100;
    setCr(totalCollaterRatio.toString());
  }, [oracleInfoList, coinSymbol, multiBottleInfo]);

  useEffect(() => {
    if (Number(amountToDeposit) > balance) {
      setAmountToDeposit(balance.toString());
    }
  }, [amountToDeposit]);

  useEffect(() => {
    const getBal = async () => {
      const balance = await getBalance(wallet.address || "", coinType);
      setBalance(
        Number(
          Number(balance) / 10 ** (multiBottleInfo?.[coinSymbol]?.decimals ?? 1)
        ) ?? 0
      );
    };
    void getBal();
  }, [wallet.address]);

  // useEffect(() => {
  //   const refetch = async () => {
  //     await refetchTotalBucketInfo();
  //     await refetchBottleInfo();
  //     onClose?.();
  //   };

  //   if (successBorrow) {
  //     onClose?.();
  //   }
  // }, [
  //   successBorrow,
  //   refetchTotalBucketInfo,
  //   refetchBottleInfo,
  //   onClose,
  //   errorBorrow,
  // ]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountToDeposit(event.target.value);
  };

  const handleSetMaxDeposit = () => {
    if (coinSymbol === "INJ") {
      setAmountToDeposit((balance - 0.1).toString());
      toast.info("0.1 $INJ is reserved for gas fee");
    } else {
      setAmountToDeposit(balance.toString());
    }
  };

  const handleDeposit = async () => {
    if (Number(amountToDeposit) <= 0) {
      toast.error("Enter an amount");
      return;
    }
    setLoading(true);
    await borrow(coinType, Number(amountToDeposit), 0).then(() => {
      setLoading(false);
      onClose?.();
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <CustomInputLabel
          functionTitle=""
          title="Wallet Balance"
          value={balance.toFixed(2)}
          symbol={coinSymbol}
        />
        <CustomInput
          onChange={handleChange}
          value={amountToDeposit}
          symbol={coinSymbol}
          onClick={handleSetMaxDeposit}
          buttonTitle="Max"
          src={coinImage}
        />
      </div>

      <div className="space-y-2 text-sm text-gray-light">
        <div className="flex justify-between">
          <div>Collateral Ratio</div>
          <div className="flex items-center justify-between">
            <FormatNumber
              number={cr}
              isLoading={loadingMultiBottleInfo}
              notation="standard"
              className="h-4 w-12 opacity-5"
              bgColor="bg-gray-light2"
            />
            <span>%</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div>Recovery Mode Threshold</div>
          <div className="flex items-center justify-between">
            <FormatNumber
              number={bucketData?.recoveryModeThreshold ?? 100}
              isLoading={loadingTotalBucketInfo}
              notation="standard"
              className="h-4 w-12 opacity-5"
              bgColor="bg-gray-light2"
              minFractionDigits={0}
            />
            <span>%</span>
          </div>
        </div>
        {/* <div className="flex justify-between">
          <div>Bucket Collateral Ratio</div>
          <div className="flex items-center justify-between">
            {!loadingMultiBottleInfo ? (
              <FormatNumber
                number={totalCollateralRatio}
                isLoading={loadingMultiBottleInfo}
                notation="standard"
                className="h-4 w-12 opacity-5"
                bgColor="bg-gray-light2"
              />
            ) : (
              <span>-/-</span>
            )}
            <span>%</span>
          </div>
        </div> */}
      </div>

      <motion.button
        whileHover={{
          scale: 1.05,
          backgroundColor: "#FFF",
          color: "#3B82F6",
          border: "1px solid #3B82F6",
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="block rounded-lg bg-primary-default py-4 text-sm font-medium text-white"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={() => handleDeposit()}
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
          "Deposit"
        )}
      </motion.button>
    </div>
  );
};

export default Deposit;
