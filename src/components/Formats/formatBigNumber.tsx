import { Skeleton } from "../ui/skeleton";
import { formatNumber, type Notation } from "~/lib/utils/format";

interface FormatBigNumberProps {
  number: string | number;
  unit?: string;
  isLoading?: boolean;
  decimal?: number;
  precision?: number;
  asBlockElement?: boolean;
  maxFractionDigits?: number;
  minFractionDigits?: number;
  notation?: Notation;
  bgColor?: string;
  className?: string;
}

const FormatBigNumber = ({
  number,
  unit = "",
  isLoading = false,
  decimal = 9,
  precision = 6,
  asBlockElement = false,
  maxFractionDigits = 2,
  minFractionDigits = 2,
  notation = "compact",
  bgColor = "bg-white",
  className = "w-30",
}: FormatBigNumberProps) => {
  // const detailString =
  //   number !== undefined
  //     ? (Number(number) / 10 ** decimal).toFixed(minFractionDigits)
  //     : "0.0";

  const shortString =
    number !== undefined
      ? formatNumber(
          Number(number) / 10 ** decimal,
          precision,
          maxFractionDigits,
          minFractionDigits,
          notation
        ) + (unit ? ` ${unit}` : "")
      : "0.00";

  return (
    <span>
      {isLoading ? (
        <Skeleton className={`h-10 w-2 opacity-60 ${bgColor} ${className}`} />
      ) : (
        <span>{shortString}</span>
      )}
    </span>
  );
};

export default FormatBigNumber;
