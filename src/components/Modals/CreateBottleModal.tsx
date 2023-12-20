//Not use anymore
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { type TokenDepositInfo } from "types";
import InjLogo from "../../../public/inj.png";
import UsdcLogo from "../../../public/usdc.png";
import BtcLogo from "../../../public/btc.png";
import EthLogo from "../../../public/eth.jpeg";
import useBucket from "~/lib/hooks/useBucket";
import { getBalance } from "~/lib/utils/inj/balances/getBalance";
import useInjWallet from "~/lib/hooks/useInjWallet";

type Props = {
  setShowCreateBottleModal: Dispatch<SetStateAction<boolean>>;
};

type AvailableCoin = {
  coinSymbol: string;
  minCR: number;
  price: number;
  logo: StaticImageData;
  coinType: string;
};

const INJ_COIN_PRICE = 10000;

const CoinsToDeposit: AvailableCoin[] = [
  {
    coinSymbol: "INJ",
    minCR: 110,
    price: 2,
    logo: InjLogo,
    coinType: "",
  },
  {
    coinSymbol: "ETH",
    minCR: 110,
    price: 1900,
    logo: EthLogo,
    coinType: "0x1::ethereum::ETH",
  },
  {
    coinSymbol: "BTC",
    minCR: 110,
    price: 28000,
    logo: BtcLogo,
    coinType: "0x1::bitcoin::BTC",
  },
  {
    coinSymbol: "zUSDC",
    minCR: 110,
    price: 1,
    logo: UsdcLogo,
    coinType: "0x1::zkSync::ZKSYNC",
  },
  {
    coinSymbol: "wUSDC",
    minCR: 110,
    price: 1,
    logo: UsdcLogo,
    coinType: "0x1::wormhole::WORMHOLE",
  },
];

const CreateBottleModal = ({ setShowCreateBottleModal }: Props) => {
  const [amountToDeposit, setAmountToDeposit] = useState<number>(0);
  const [amountToBorrow, setAmountToBorrow] = useState<number>(0);
  const [selectedToDeposit, setSelectedToDeposit] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const wallet = useInjWallet();
  // const { borrow } = useBucket();

  useEffect(() => {
    if (!amountToDeposit) return;
    if (amountToDeposit > Number(balance) / 10 ** 9) {
      setAmountToDeposit(Number(balance) / 10 ** 9);
    }
  }, [amountToDeposit]);

  const tokenInfo: TokenDepositInfo = {
    tokenName: "",
    depositBalance: 10000,
  };

  const handleDepositChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountToDeposit(Number(event.target.value));
  };

  const handleBorrowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountToBorrow(Number(event.target.value));
  };

  const handleSetToDeposit = async (coinType: string) => {
    setSelectedToDeposit(coinType);
    setAmountToBorrow(0);
    setAmountToDeposit(0);
    if (!wallet.address) return;
    const balance = await getBalance(wallet.address, coinType);
    setBalance(balance ?? 0);
  };

  const handleConfirm = () => {
    if (!selectedToDeposit) return;

    // await borrow(selectedToDeposit, amountToDeposit, amountToBorrow);

    setShowCreateBottleModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-opacity-30 pt-[5vh] backdrop-blur-sm sm:pt-[0vh]">
      <div className="relative h-full w-full max-w-md p-4 md:h-auto">
        <div className="relative rounded-2xl border bg-black shadow">
          <button
            onClick={() => setShowCreateBottleModal(false)}
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm "
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
            <div className="text-2xl font-bold">Create Position</div>
            <div className="">
              <div className="px-2.5 pt-4">Coin</div>
              <div className="flex justify-center">
                <Menu>
                  <MenuHandler>
                    <button className="action-button-big">
                      {selectedToDeposit ? (
                        <div className="ml-[-14px] flex items-center justify-center space-x-2">
                          <Image
                            src={
                              CoinsToDeposit.find(
                                (coin) => coin.coinType == selectedToDeposit
                              )?.logo!
                            }
                            width={20}
                            height={20}
                            alt={
                              CoinsToDeposit.find(
                                (coin) => coin.coinType == selectedToDeposit
                              )?.coinSymbol!
                            }
                            className="rounded-full"
                            priority={true}
                          />
                          <div>
                            {
                              CoinsToDeposit.find(
                                (coin) => coin.coinType == selectedToDeposit
                              )?.coinSymbol
                            }
                          </div>
                        </div>
                      ) : (
                        <div className="animate-pulse">Select Coin</div>
                      )}
                    </button>
                  </MenuHandler>
                  <MenuList className="z-50 w-[190px] space-y-2 bg-black font-mono font-bold text-white">
                    {CoinsToDeposit.map((coin, index) => (
                      <MenuItem
                        key={index}
                        onClick={() => handleSetToDeposit(coin.coinType)}
                        className="hover:bg-gray-600 border pt-2"
                      >
                        <div className="flex items-center space-x-2 pl-8">
                          <Image
                            src={coin.logo}
                            width={20}
                            height={20}
                            alt={coin.coinSymbol}
                            className="rounded-full"
                            priority={true}
                          />
                          <div>{coin.coinSymbol}</div>
                        </div>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </div>

              <div className="flex items-center justify-between px-2.5 pt-4">
                <div className="">Deposit</div>
                <div className="text-gray-400 text-xs">
                  <>
                    balance: {Number(balance) / 10 ** 9}{" "}
                    {
                      CoinsToDeposit.find(
                        (coin) => coin.coinType == selectedToDeposit
                      )?.coinSymbol
                    }
                  </>
                </div>
              </div>
              <div className="px-2 py-2">
                <div className="border-gray-400 space-y-2 rounded-xl border">
                  <div className="flex items-center px-2">
                    <input
                      type="number"
                      className="placeholder-gray-400 block w-full rounded-lg bg-transparent p-2 text-sm text-white focus:outline-none lg:text-lg"
                      onChange={handleDepositChange}
                      value={amountToDeposit?.toString()}
                    />
                    <div className="">
                      <motion.button
                        onClick={() =>
                          setAmountToDeposit(tokenInfo.depositBalance * 0.5)
                        }
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-lg border px-2"
                      >
                        50%
                      </motion.button>
                    </div>
                    <div className="">
                      <motion.button
                        onClick={() =>
                          setAmountToDeposit(tokenInfo.depositBalance * 0.75)
                        }
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-lg border px-2"
                      >
                        75%
                      </motion.button>
                    </div>
                    <div className="">
                      <motion.button
                        onClick={() =>
                          setAmountToDeposit(tokenInfo.depositBalance)
                        }
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-lg border px-2"
                      >
                        Max
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-2.5 pt-4">
                <div
                  className={`${
                    amountToBorrow < 10 && amountToBorrow > 0
                      ? "text-red-600"
                      : "text-white"
                  }`}
                >
                  Borrow
                </div>
                <div className="text-gray-400 text-xs">balance: 0 BUCK</div>
              </div>
              <div className="px-2 py-2">
                <div
                  className={`space-y-2 rounded-xl border ${
                    amountToBorrow < 10 && amountToBorrow > 0
                      ? "border-red-600"
                      : "border-gray-400"
                  } `}
                >
                  <div className="flex items-center px-2">
                    <input
                      type="number"
                      className="placeholder-gray-400 block w-full rounded-lg bg-transparent p-2 text-sm text-white focus:outline-none lg:text-lg"
                      onChange={handleBorrowChange}
                      value={amountToBorrow?.toString()}
                    />
                    <div className="">
                      <motion.button
                        onClick={() =>
                          setAmountToBorrow(
                            selectedToDeposit && amountToDeposit
                              ? Number(
                                  Number(
                                    ((amountToDeposit *
                                      CoinsToDeposit.find(
                                        ({ coinType }) =>
                                          coinType === selectedToDeposit
                                      )?.price! *
                                      100) /
                                      CoinsToDeposit.find(
                                        ({ coinType }) =>
                                          coinType === selectedToDeposit
                                      )?.minCR!) *
                                      0.5
                                  ).toFixed(2)
                                )
                              : 0
                          )
                        }
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-lg border px-2"
                      >
                        50%
                      </motion.button>
                    </div>
                    <div className="">
                      <motion.button
                        onClick={() =>
                          setAmountToBorrow(
                            selectedToDeposit && amountToDeposit
                              ? Number(
                                  Number(
                                    ((amountToDeposit *
                                      CoinsToDeposit.find(
                                        ({ coinType }) =>
                                          coinType === selectedToDeposit
                                      )?.price! *
                                      100) /
                                      CoinsToDeposit.find(
                                        ({ coinType }) =>
                                          coinType === selectedToDeposit
                                      )?.minCR!) *
                                      0.75
                                  ).toFixed(2)
                                )
                              : 0
                          )
                        }
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-lg border px-2"
                      >
                        75%
                      </motion.button>
                    </div>
                    <div className="">
                      <motion.button
                        onClick={() =>
                          setAmountToBorrow(
                            selectedToDeposit && amountToDeposit
                              ? Number(
                                  Number(
                                    (
                                      (amountToDeposit *
                                        CoinsToDeposit.find(
                                          ({ coinType }) =>
                                            coinType === selectedToDeposit
                                        )?.price! *
                                        100) /
                                      CoinsToDeposit.find(
                                        ({ coinType }) =>
                                          coinType === selectedToDeposit
                                      )?.minCR!
                                    ).toFixed(2)
                                  )
                                )
                              : 0
                          )
                        }
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-lg border px-2"
                      >
                        Max
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`${
                  amountToBorrow < 10 && amountToBorrow > 0
                    ? "flex px-2.5 text-xs text-red-600"
                    : "hidden"
                }`}
              >
                Minimum borrow amount is 10 BUCK.
              </div>

              <div className="px-2.5 pt-4">Transaction overview</div>
              <div className="px-2 py-2 text-xs sm:text-sm">
                <div className="border-gray-400 space-y-2 rounded-xl border py-2 px-2">
                  <div className="flex justify-between">
                    <div>Collateral Ratio</div>
                    <div>
                      {(amountToDeposit * INJ_COIN_PRICE) / amountToBorrow}%
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>Min Collateral Ratio</div>
                    <div>
                      {selectedToDeposit
                        ? CoinsToDeposit.find(
                            ({ coinType }) => coinType === selectedToDeposit
                          )?.minCR
                        : 0}
                      %
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>Mint Cap</div>
                    <div>10000/2500000</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Mint Fee</div>
                    <div>0.25%</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Borrow Fee</div>
                    <div>0.00 BUCK (0.30%)</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Liquidation Price</div>
                    <div>$0.3</div>
                  </div>
                  {/* <div className="flex justify-between">
                    <div>Interest Rate</div>
                    <div>0%</div>
                  </div> */}
                </div>
              </div>

              <div className="flex justify-center px-2 pt-4 pb-4">
                <motion.button
                  className="action-button disabled:cursor-not-allowed"
                  disabled={
                    amountToBorrow < 10 ||
                    !amountToBorrow ||
                    !amountToDeposit ||
                    !selectedToDeposit
                  }
                  onClick={() => handleConfirm()}
                >
                  Confirm
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBottleModal;
