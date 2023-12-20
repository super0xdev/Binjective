import { useEffect, useState } from "react";
import type { UseDisclosureProps } from "~/lib/hooks/useDisclosure";
import CustomInput from "./CustomInput";
import CustomInputLabel from "./CustomInputLabel";
import BottleDetail from "./BottleDetail";
import FormatNumber from "../Formats/formatNumber";
import useMultiAggregator from "~/lib/hooks/useMultiAggregator";
import OBJECTID from "~/lib/utils/objectIdMap";
import { REFETCH_SEC } from "~/lib/utils/constants";
import useMultiBucketInfo from "~/lib/hooks/useMultiBucketInfo";
import useMultiBottleInfo from "~/lib/hooks/useMultiBottleInfo";
import { formatBigInt } from "~/lib/utils/unit";
import {
  MARKET_COINS_TYPE_LIST,
  type ACCEPT_ASSETS,
} from "~/lib/utils/constants";
import type { BottleAmountsList } from "~/lib/utils/inj/bottle/getMultiBottleInfo";
import useBorrow from "~/lib/hooks/Bucket/useBorrow";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

type BorrowProps = UseDisclosureProps & {
  coinSymbol: string;
  multiBottleInfo: BottleAmountsList;
  loadingMultiBottleInfo: boolean;
};

const Borrow = (props: BorrowProps) => {
  const { coinSymbol, onClose, multiBottleInfo, loadingMultiBottleInfo } =
    props;
  const coinType = MARKET_COINS_TYPE_LIST[coinSymbol as ACCEPT_ASSETS] ?? "";
  const [cr, setCr] = useState("");
  const [amountToBorrow, setAmountToBorrow] = useState(0);
  const [loading, setLoading] = useState(false);
  const { executeBorrow, loadingBorrow, errorBorrow, successBorrow, borrow } =
    useBorrow(coinSymbol, coinType, 0, amountToBorrow);
  const { bottleInfo, refetchBottleInfo, loadingBottleInfo } =
    useMultiBottleInfo(60);
  // const { bottleInfo } = useBottleInfo(COIN_TYPE[coinSymbol]);
  const oracleList: Record<string, string> = OBJECTID.SUPRAOBJECTID;
  const oracleNameList = Object.keys(oracleList);
  const oracleIdList = Object.values(oracleList);
  const { oracleInfoList, loadingOracleInfo } = useMultiAggregator(
    oracleNameList,
    oracleIdList,
    REFETCH_SEC
  );

  const { totalBucketData, refetchTotalBucketInfo, loadingTotalBucketInfo } =
    useMultiBucketInfo(60);
  const bucketData = totalBucketData && totalBucketData[coinSymbol];

  const mockLoading = false;

  const assetPrice =
    oracleInfoList !== undefined ? oracleInfoList[coinSymbol] ?? 1 : 1;

  const coinBottleInfo = bottleInfo?.[coinSymbol];
  const coinCollateralAmount = Number(
    (coinBottleInfo?.collateralAmount || 0) /
      10 ** (coinBottleInfo?.decimals || 9)
  );

  const maxBorrowAmout =
    (Number(coinCollateralAmount || 0) * assetPrice) /
    (Number(bucketData?.minCollateralRatio || 100) / 100);

  const remainingBorrowableAmount = Number(
    (
      maxBorrowAmout -
      Number(coinBottleInfo?.buckAmount || 0) / 10 ** 9
    ).toFixed(2)
  );

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
    if (amountToBorrow > remainingBorrowableAmount) {
      setAmountToBorrow(remainingBorrowableAmount);
    }
  }, [amountToBorrow, remainingBorrowableAmount]);

  // useEffect(() => {
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
    setAmountToBorrow(Number(event.target.value));
  };

  const handleSetHalf = () => {
    setAmountToBorrow(maxBorrowAmout);
  };

  const handleBorrow = async () => {
    if (amountToBorrow <= 0) {
      toast.error("Enter an amount");
      return;
    }
    setLoading(true);
    await borrow(coinType, 0, amountToBorrow).then(() => {
      setLoading(false);
      onClose?.();
    });
  };

  const bottleInfoList = [
    // {
    //   id: "ywr",
    //   title: "You wil receive",
    //   value: "49.25",
    //   unit: " BUCK",
    // },
    {
      id: "cr",
      title: "Collateral Ratio",
      value: loadingMultiBottleInfo ? "-/-" : `${Number(cr).toFixed(2)}`,
      // value: "-/-",
      unit: "%",
    },
    {
      id: "mcr",
      title: "Min Collateral Ratio",
      value: loadingTotalBucketInfo
        ? "-/-"
        : `${Number(bucketData?.minCollateralRatio).toFixed(0) ?? "-/-"}`,
      unit: "%",
      minFractionDigits: 0,
    },
    // {
    //   id: "mc",
    //   title: "Mint Cap",
    //   value: "100,000/2,500,000",
    //   unit: "",
    // },
    // {
    //   id: "ir",
    //   title: "Interest Rate",
    //   value: "0",
    //   unit: "%",
    // },
    {
      id: "mbd",
      title: "Min Borrowed Debt",
      value: "10",
      unit: " BUCK",
    },
  ];

  // const bottleInfoList = [
  //   {
  //     id: "ccr",
  //     title: "Current CR",
  //     value: `${(cr * 100).toFixed(2)}%`,
  //   },
  //   {
  //     id: "mcr",
  //     title: "Min CR",
  //     value: `${MIN_CR * 100}%`,
  //   },
  // ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        {/* <div className="text-2xl font-bold">Borrow INJ</div>
      <div className="pt-4">
        <div className="flex justify-start space-x-1 text-gray-400">
          <div>Amount</div>
          <AmountPopover content="This is the total amount available for you to borrow. You can borrow based on your collateral and until the borrow cap is reached." />
        </div>
      </div> */}
        <CustomInputLabel
          functionTitle=""
          title="You can still borrow"
          value={remainingBorrowableAmount}
          symbol="BUCK"
        />
        <CustomInput
          onChange={handleChange}
          value={amountToBorrow.toString()}
          onClick={handleSetHalf}
          buttonTitle="50%"
          src="/bucket-light.svg"
          symbol={"BUCK"}
          isSubButton={false}
        />

        <div className="ml-auto flex gap-1 text-xs text-gray-light">
          <div>Borrow Fee : </div>
          <div className="flex items-center justify-between">
            {mockLoading ? (
              <FormatNumber
                number={0.6}
                isLoading={mockLoading}
                notation="standard"
                className="h-4 w-12 opacity-5"
                bgColor="bg-gray-light2"
              />
            ) : (
              <span>0.5</span>
            )}
            <span>%</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-light">
        {bottleInfoList.map((bottleInfo) => (
          <BottleDetail
            key={bottleInfo.id}
            id={bottleInfo.id}
            title={bottleInfo.title}
            value={bottleInfo.value}
            isLoading={mockLoading}
            unit={bottleInfo.unit}
            minFractionDigits={bottleInfo.minFractionDigits}
          />
        ))}
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
        className="block rounded-lg bg-[#2E79DC] py-4 text-sm font-medium text-white"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={() => handleBorrow()}
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
          "Borrow"
        )}
      </motion.button>
    </div>
  );
};

export default Borrow;
