import React from "react";
import InfoPopover from "../Layout/InfoPopover";

type Info = {
  title: string;
  description: string;
  value: number;
  valueType: "value" | "percent" | "amount";
};

const Infos: Info[] = [
  {
    title: "TVL",
    description:
      "The total value of collateral (BTC, ETH, INJ) locked in the protocol.",
    value: 27327228,
    valueType: "value",
  },
  {
    title: "Total Positions",
    description: "The total number of positions created in the system.",
    value: 535,
    valueType: "amount",
  },
  {
    title: "Total Collateral Ratio",
    description:
      "The ratio of the USD value of the entire system collateral divided by the entire system debt.",
    value: 137.78,
    valueType: "percent",
  },
  {
    title: "BUCK Supply",
    description: "The total BUCK minted by the system.",
    value: 19833885,
    valueType: "value",
  },

  {
    title: "BUCK in Tank",
    description:
      "The total value of collateral (BTC, ETH, INJ) locked in the Tank.",
    value: 15478693.27,
    valueType: "value",
  },
  {
    title: "Tank APR",
    description:
      "An estimate of the BKT return on the BUCK deposited to the Tank over the next year, not including your INJ gains from liquidations.($BKT_REWARDS * DAILY_ISSUANCE% / DEPOSITED_BUCK) * 365 * 100 = APR($17.4M * 0.1897% / $178M) * 365 * 100 = 6.78%. This excludes INJ gains from liquidation.",
    value: 6.78,
    valueType: "percent",
  },
  {
    title: "Staked BKT",
    description:
      "The total amount of BKT that is staked for earning fee revenue.",
    value: 0,
    valueType: "value",
  },
];

const Performance = () => {
  return (
    <div className="">
      <div className="text-center text-2xl font-bold md:text-4xl">
        Protocol Stats
      </div>
      <div className="pt-10" />
      <div className="flex justify-center">
        <div className="mx-2 w-full rounded-xl bg-white pr-[2px] pb-2 sm:w-[500px]">
          <div className="ml-[-4px] mt-[-4px] h-auto w-full rounded-lg border bg-black">
            <div className="flex justify-between p-4">
              <div className="w-full space-y-4 sm:space-y-2">
                {Infos.map((info, index) => (
                  <div
                    className="space-y-1 sm:flex sm:items-center sm:justify-between"
                    key={index}
                  >
                    <InfoPopover
                      title={info.title}
                      description={info.description}
                    />
                    <div className="text-sm">
                      {info.valueType == "value" ? "$" : null}
                      {info.value.toLocaleString()}
                      {info.valueType == "percent" ? "%" : null}
                      {info.title == "BUCKS in Tank" ? (
                        <span className="text-gray-400">(78.04%)</span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
