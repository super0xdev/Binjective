import { Skeleton } from "../ui/skeleton";
import { formatNumber, type Notation } from "~/lib/utils/format";

interface FormatNumberProps {
  number: string | number;
  unit?: string;
  isLoading?: boolean;
  precision?: number;
  asBlockElement?: boolean;
  maxFractionDigits?: number;
  minFractionDigits?: number;
  notation?: Notation;
  bgColor?: string;
  className?: string;
}

const FormatNumber = ({
  number,
  unit = "",
  isLoading = false,
  precision = 6,
  asBlockElement = false,
  maxFractionDigits = 2,
  minFractionDigits = 2,
  notation = "compact",
  bgColor = "bg-white",
  className = "w-30",
}: FormatNumberProps) => {
  const detailString = number !== undefined ? number : "0.0";

  const shortString =
    number !== undefined
      ? formatNumber(
          Number(number),
          precision,
          maxFractionDigits,
          minFractionDigits,
          notation
        ) + (unit !== "" ? ` ${unit}` : "")
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

export default FormatNumber;
