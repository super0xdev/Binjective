/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import { AiOutlineCopy } from "react-icons/ai";
import { toast } from "react-toastify";
import { URLS } from "~/lib/utils/constants";
import useInjWallet from "~/lib/hooks/useInjWallet";

const Connected = () => {
  const { address, disconnect } = useInjWallet();

  const handleDisconnect = () => {
    disconnect();
  };
  const handleCopyText = async () => {
    await navigator.clipboard
      .writeText(address ?? "")
      .then(() => toast.success("Copied to clipboard!"));
  };

  return (
    <Menu placement="bottom" offset={16}>
      <MenuHandler>
        <motion.button className="h-[45px] w-[130px] rounded-xl bg-gradient-to-br from-[#2ebef3] to-[#fffc9f] font-semibold text-blue-600">
          {address?.slice(0, 4)}...
          {address?.slice(-4)}
        </motion.button>
      </MenuHandler>
      <MenuList className="z-20 py-2 px-3 text-black">
        <MenuItem
          className="flex items-center justify-center gap-2 py-3 hover:bg-primary-hover hover:text-white"
          onClick={handleCopyText}
        >
          <AiOutlineCopy strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="text-sm font-medium">
            Copy Address
          </Typography>
        </MenuItem>
        {/* <MenuItem
          className="flex items-center justify-center gap-2 py-3 hover:bg-primary-hover hover:text-white"
          onClick={() =>
          }
        >
          <SlMagnifier strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="text-sm font-medium">
            Explorer
          </Typography>
        </MenuItem> */}
        <div className="my-2 border-t border-t-gray" />
        <MenuItem
          className="flex items-center justify-center gap-2 py-3 hover:bg-primary-hover hover:text-white"
          onClick={handleDisconnect}
        >
          <Typography variant="small" className="text-sm font-medium">
            Disconnect
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Connected;
