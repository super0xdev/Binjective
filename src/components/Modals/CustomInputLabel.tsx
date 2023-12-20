type Props = {
  functionTitle: string;
  symbol: string;
  value: string | number | undefined;
  title: string;
};

const CustomInputLabel = ({ functionTitle, value, symbol, title }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <p>{functionTitle}</p>
      <div className="text-xs text-gray-light">
        {title}: {value} {symbol}
      </div>
    </div>
  );
};

export default CustomInputLabel;
