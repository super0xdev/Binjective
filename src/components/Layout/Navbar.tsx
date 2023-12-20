import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/router";
import Connected from "../Button/Connected";
import { NAVS } from "~/lib/utils/constants";
import { motion } from "framer-motion";
import ConnectModal from "./ConnectModal";
import useDisclosure from "~/lib/hooks/useDisclosure";
import useInjWallet from "~/lib/hooks/useInjWallet";

const Navbar = () => {
  const [nav, setNav] = useState<boolean>(false);
  const router = useRouter();
  const pathname = router.pathname.split("/")[1];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connected } = useInjWallet();

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="fixed top-0 z-20 w-full bg-black">
      <div className="flex items-center justify-between px-4 py-5 text-white md:px-8 lg:px-[100px]">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="mx-1 flex items-center justify-center"
        >
          <Link href="/">
            <Image
              src="/bijective-symbol.png"
              height={100}
              width={100}
              alt="Bijective Logo"
              priority={true}
              className="h-[40px] w-[40px] md:hidden"
            />
            <Image
              src="/bijective-nav.png"
              height={86}
              width={108}
              alt="Bijective Logo"
              priority={true}
              className="hidden md:flex md:h-[60px] md:w-[220px]"
            />
          </Link>
        </motion.div>
        {/* <Testnet /> */}
        <ul className="hidden md:gap-6 lg:ml-auto lg:flex lg:items-center">
          {NAVS.map((link, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="mx-1 flex items-center justify-center"
            >
              <li
                key={index}
                className={`text-sm  ${
                  pathname === link.url.split("/")[1]
                    ? "bg-gradient-to-r from-[#2ebef3] to-[#fffc9f] bg-clip-text font-bold text-transparent"
                    : "font-medium text-white"
                }`}
              >
                <Link href={`${link.url}`}>{link.name}</Link>
              </li>
            </motion.div>
          ))}
        </ul>

        {/* Mobile Button */}
        <div className="z-10 ml-auto block lg:hidden">
          {nav ? (
            <div className="flex items-center space-x-4">
              <AiOutlineClose
                size={30}
                style={{ color: "white" }}
                onClick={handleNav}
              />
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <AiOutlineMenu
                size={30}
                style={{ color: "white" }}
                onClick={handleNav}
              />
            </div>
          )}
        </div>

        <div className="z-10 pl-5 md:pl-8">
          {connected ? (
            <Connected />
          ) : (
            <button
              className="h-[45px] w-[130px] rounded-lg bg-blue-500 text-white"
              onClick={() => onOpen()}
            >
              Connect
            </button>
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`${
          nav ? "" : "hidden"
        } flex h-80 w-full flex-1 border-t-[0.5px] border-gray-light2 bg-white text-center duration-300 ease-in lg:hidden`}
      >
        <ul className="flex w-full flex-1 flex-col items-center justify-center">
          {NAVS.map((link, index) => (
            <li
              key={index}
              className={`flex h-1/4 w-full border-b-[0.5px] border-gray-light2 text-sm font-medium ${
                pathname === link.url.split("/")[1]
                  ? "text-blue-500"
                  : "text-white"
              }`}
              onClick={handleNav}
            >
              <Link
                href={`${link.url}`}
                className="flex flex-1 items-center justify-center"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <ConnectModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </div>
  );
};

export default Navbar;
