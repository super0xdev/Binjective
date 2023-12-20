/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { motion } from "framer-motion";
import useOnClickOutside from "../../lib/hooks/useOnClickOutside";
import { type TokenDepositInfo } from "types";

type Props = {
  coinSymbol: string;
  setShowWithdrawModal: Dispatch<SetStateAction<boolean>>;
};

const WithdrawModal = ({ coinSymbol, setShowWithdrawModal }: Props) => {
  const [amountToWithdraw, setAmountToWithdraw] = useState(0);
  const clickOutsideRef = useRef<HTMLDivElement>(null);
  const clickOutsidehandler = () => {
    setShowWithdrawModal(false);
  };
  useOnClickOutside(clickOutsideRef, clickOutsidehandler);
  useEffect(() => {
    if (amountToWithdraw > tokenInfo.depositBalance) {
      setAmountToWithdraw(tokenInfo.depositBalance);
    }
  }, [amountToWithdraw]);

  const tokenInfo: TokenDepositInfo = {
    tokenName: coinSymbol,
    depositBalance: 10000,
  };

  const healthFactor = 1.5;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountToWithdraw(Number(event.target.value));
  };

  const handleSetMax = () => {
    setAmountToWithdraw(tokenInfo.depositBalance);
  };

  return (
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-opacity-30 pt-[15vh] backdrop-blur-sm sm:pt-[0vh]">
      <div className="relative h-full w-full max-w-md p-4 md:h-auto">
        <div
          ref={clickOutsideRef}
          className="relative rounded-2xl border bg-black shadow"
        >
          <button
            onClick={() => setShowWithdrawModal(false)}
            className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 "
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="p-3">
            <div className="text-2xl font-bold">Withdraw {coinSymbol}</div>
            <div className="pt-4">
              <div className="">Amount</div>
            </div>
            <div className="px-2 py-2">
              <div className="space-y-2 rounded-xl border border-gray-400 py-2">
                <div className="flex items-center px-2">
                  <input
                    type="number"
                    className="block w-full rounded-lg bg-transparent p-2.5 text-sm text-white placeholder-gray-400 focus:outline-none lg:text-lg"
                    placeholder="0"
                    onChange={handleChange}
                    value={amountToWithdraw.toString()}
                  />
                  <div className="">
                    <button className="h-[40px] w-[100px] rounded-xl bg-white/20">
                      <div className="text-white">{tokenInfo.tokenName}</div>
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2 pr-2">
                  <div className="text-sm text-white">
                    Deposit Balance: {tokenInfo.depositBalance}
                  </div>
                  <motion.button
                    onClick={handleSetMax}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-lg border px-2 py-1"
                  >
                    Max
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="">Transaction overview</div>
            <div className="px-2 py-2">
              <div className="space-y-2 rounded-xl border border-gray-400 py-2 px-2">
                <div className="flex justify-between">
                  <div>Remaining deposit</div>
                  <div>{tokenInfo.depositBalance - amountToWithdraw}</div>
                </div>
                <div className="flex justify-between">
                  <div>Health factor</div>
                  <div>{healthFactor} to 2 </div>
                </div>
                <div className="text-end text-sm text-gray-400">
                  Liquidation at{" "}
                </div>
              </div>
            </div>
            <div className="flex justify-center px-2 pt-2 pb-4">
              <motion.button className="action-button">Withdraw</motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
