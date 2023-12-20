import FormatNumber from "../Formats/formatNumber";

type Props = {
  id?: string;
  value: string;
  title: string;
  isLoading: boolean;
  unit?: string;
  minFractionDigits?: number;
};

const BottleDetail = ({
  id,
  title,
  value,
  isLoading,
  unit,
  minFractionDigits = 2,
}: Props) => {
  const isValidValue = id !== "cr" && id !== "tcr";

  return (
    <div className="flex flex-row justify-between">
      <span>{title}</span>
      {isValidValue ? (
        <FormatNumber
          number={value}
          isLoading={isLoading}
          unit={unit}
          notation="standard"
          className="h-4 w-12 opacity-5"
          bgColor="bg-gray-light2"
          minFractionDigits={minFractionDigits}
        />
      ) : (
        <span>
          {value}
          {unit}
        </span>
      )}
    </div>
  );
};

export default BottleDetail;
