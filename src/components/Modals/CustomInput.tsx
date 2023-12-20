import Image, { type StaticImageData } from "next/image";

type Props = {
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number | undefined;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonTitle: string | undefined;
  src: StaticImageData | string;
  symbol: string | undefined;
  isSubButton?: boolean;
};

const CustomInput = ({
  className,
  onChange,
  value,
  onClick,
  buttonTitle,
  src,
  symbol,
  isSubButton = true,
}: Props) => {
  return (
    <div
      className={
        className
          ? className
          : "relative my-2 flex items-center rounded-lg border border-gray-light2 px-2 py-1"
      }
    >
      <input
        type="number"
        className="block w-full rounded-lg bg-transparent p-2 pr-32 text-sm text-black placeholder-gray-light2 focus:outline-none lg:text-lg"
        placeholder="0"
        onChange={onChange}
        value={value}
      />
      <div className="absolute inset-y-0 right-0 flex w-38 items-center">
        <button
          onClick={onClick}
          className="m-2 rounded-lg bg-gray-light3 py-1 px-2 text-primary-default"
          style={{
            visibility: isSubButton ? "visible" : "hidden",
          }}
        >
          {buttonTitle}
        </button>
        {/* TODO: Icon size workaround */}
        {src === "/bucket-light.png" ? (
          <Image src={src} width={30} height={30} alt="coin" />
        ) : (
          <Image
            src={src}
            width={20}
            height={20}
            alt="coin"
            className="m-[5px]"
          />
        )}
        <p className="mx-2 text-black">{symbol}</p>
      </div>
    </div>
  );
};

export default CustomInput;
