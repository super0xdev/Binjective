import { cn } from "~/lib/utils/cn";

interface TabButtonProps {
  tab: number;
  setTab: (tab: number) => void;
}

const TabButtonSection = ({ tab, setTab }: TabButtonProps) => {
  return (
    <div
      className={cn(
        "mt-24 w-full rounded-t-2xl bg-black lg:mt-32.5 lg:rounded-t-15"
      )}
    >
      <div className="mx-auto w-full max-w-360 lg:px-28 2xl:px-7">
        {/* Tab buttons */}
        <div
          className={cn(
            "flex h-12.5 w-full items-center justify-between lg:h-35 "
          )}
        >
          <div
            className={cn(
              "h-full w-165",
              tab === 0 &&
                "bg-gradient-to-r from-[#28CBD600] via-[#3998EC] to-[#28CBD600]"
            )}
          >
            <button
              className={cn(
                "text-md h-11.5 w-full bg-black font-bold lg:h-33.5 lg:text-2xl",
                tab === 0 ? "text-white " : "text-primary-dark2"
              )}
              onClick={() => setTab(0)}
            >
              Deposit BUCK
            </button>
          </div>
          <div
            className={cn(
              "h-full w-165 ",
              tab === 1 &&
                "bg-gradient-to-r from-[#28CBD600] via-[#3998EC] to-[#28CBD600]"
            )}
          >
            <button
              className={cn(
                "text-md h-11.5 w-full bg-black font-bold lg:h-33.5 lg:text-2xl",
                tab === 1 ? "text-white" : "text-white"
              )}
              onClick={() => setTab(1)}
              disabled
            >
              DEX Liquidity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabButtonSection;
