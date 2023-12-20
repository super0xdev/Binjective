import React from "react";
import Image from "next/image";
import InjLogo from "../../../public/inj.png";
import { AiOutlinePieChart } from "react-icons/ai";
import { RiArrowUpDownFill } from "react-icons/ri";

const MarketInfo = () => {
  return (
    <div>
      <div className="ml-[-5px] flex items-center space-x-2">
        <Image
          src={InjLogo}
          alt="INJ Logo"
          height={60}
          width={60}
          className="rounded-full"
        />
        <div className="text-4xl font-bold">Injective Market</div>
      </div>
      <div className="grid grid-cols-2 pt-8 md:flex md:space-x-4">
        <div className="flex space-x-2 lg:items-center">
          <AiOutlinePieChart className="hidden h-[40px] w-[40px] lg:flex" />
          <div>
            <div className="text-gray-400 text-xs sm:text-sm">
              Total market size
            </div>
            <div className="text-md sm:text-lg md:text-xl">$ 226.91M</div>
          </div>
        </div>
        <div className="flex space-x-2 lg:items-center">
          <RiArrowUpDownFill className="hidden h-[40px] w-[40px] lg:flex" />
          <div>
            <div className="text-gray-400 text-xs sm:text-sm">
              Total available
            </div>
            <div className="text-md sm:text-lg md:text-xl">$ 173.33M</div>
          </div>
        </div>
        <div className="flex space-x-2 lg:items-center">
          <RiArrowUpDownFill className="hidden h-[40px] w-[40px] lg:flex" />
          <div>
            <div className="text-gray-400 text-xs sm:text-sm">
              Total borrows
            </div>
            <div className="text-md sm:text-lg md:text-xl">$ 53.54M</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketInfo;
