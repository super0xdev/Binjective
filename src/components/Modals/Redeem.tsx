import { useState } from "react";
import useBalances from "~/lib/hooks/useBalances";
import { COIN_TYPE } from "~/lib/utils/inj/constants";
import useBucket from "~/lib/hooks/useBucket";
import type { UseDisclosureProps } from "~/lib/hooks/useDisclosure";
import CustomInput from "./CustomInput";
import CustomInputLabel from "./CustomInputLabel";
import FormatNumber from "../Formats/formatNumber";

type RedeemProps = UseDisclosureProps & {
  coinSymbol: string;
};

const Redeem = ({ onClose, coinSymbol }: RedeemProps) => {
  const [amountToRedeem, setAmountToRedeem] = useState(0);
  const { balances } = useBalances([COIN_TYPE.BUCK], [9]);
  const { redeem } = useBucket("BUCK");
  const mockLoading = false;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountToRedeem(Number(event.target.value));
  };

  const handleSetMax = () => {
    setAmountToRedeem((balances && balances[0]) || 0);
  };

  const redeemBuck = async () => {
    await redeem();
    onClose?.();
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <CustomInputLabel
          // functionTitle={`Redeem ${coinSymbol}`}
          functionTitle=""
          symbol="BUCK"
          title="Wallet Balance"
          value={(balances && balances[0]) || 0}
        />
        <CustomInput
          onChange={handleChange}
          value={amountToRedeem.toString()}
          symbol="BUCK"
          onClick={handleSetMax}
          buttonTitle="Max"
          src="/bucket-light.svg"
        />

        <div className="ml-auto flex gap-1 text-xs text-[#9D9D9D]">
          <div>Balance: </div>
          <div className="flex items-center justify-between">
            {mockLoading ? (
              <FormatNumber
                number={100}
                isLoading={mockLoading}
                notation="standard"
                className="h-4 w-12 opacity-5"
                bgColor="bg-gray-light2"
              />
            ) : (
              <span>100</span>
            )}
            <span className="ml-1">BUCK</span>
          </div>
        </div>
      </div>
      <div className="space-y-2 rounded-xl py-2 text-sm text-gray-light">
        <div className="flex justify-between">
          <div>Average Price</div>
          <div className="flex items-center justify-between">
            <span>$</span>
            {mockLoading ? (
              <FormatNumber
                number={100}
                isLoading={mockLoading}
                notation="standard"
                className="h-4 w-12 opacity-5"
                bgColor="bg-gray-light2"
              />
            ) : (
              <span>0.9</span>
            )}
            <span className="ml-1">USD</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div>Estimated INJ</div>
          <div className="flex items-center justify-between">
            {mockLoading ? (
              <FormatNumber
                number={100}
                isLoading={mockLoading}
                notation="standard"
                className="h-4 w-12 opacity-5"
                bgColor="bg-gray-light2"
              />
            ) : (
              <span>1300</span>
            )}
            <span className="ml-1">{coinSymbol}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div>Redeem Fee</div>
          <div className="flex items-center justify-between">
            {mockLoading ? (
              <FormatNumber
                number={100}
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
      <button
        className="block rounded-lg bg-[#2E79DC] py-4 text-sm font-medium text-white"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={redeemBuck}
      >
        Redeem
      </button>
    </div>
  );
};

export default Redeem;
