import React from "react";
import Link from "next/link";
import Image from "next/image";
import { EVENTS } from "~/lib/utils/constants";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="mx-auto flex w-full max-w-360 flex-col items-center justify-between px-4 py-6 lg:flex-row lg:py-4 lg:px-20 2xl:px-7">
        <div className="flex flex-col items-center justify-center lg:flex-row">
          <div className="flex items-center justify-between">
            <span className="mr-3 text-sm tracking-[3px] text-white">
              Powered by
            </span>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/">
                <Image
                  src="/bijective-nav.png"
                  width={80}
                  height={16}
                  alt="footer-logo"
                  loading="eager"
                  className="h-5 w-20"
                />
              </Link>
            </motion.div>
          </div>
        </div>
        {/* <div className="mt-8 flex items-center justify-between gap-8  lg:mt-0 lg:gap-5 lg:pb-0">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mx-1 flex items-center justify-center"
          >
            <Link href="https://twitter.com/bucket_protocol" target="_blank">
              <Image
                src="/twitter-light.svg"
                width={20}
                height={20}
                alt="twitter-logo"
                loading="eager"
                className="h-5 w-5"
              />
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mx-1 flex items-center justify-center"
          >
            <Link href="https://t.me/bucketprotocol" target="_blank">
              <Image
                src="/telegram-light.svg"
                width={20}
                height={20}
                alt="telegram-logo"
                loading="eager"
              />
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mx-1 flex items-center justify-center"
          >
            <Link href="https://discord.com/invite/nYCnNJE6Tr" target="_blank">
              <Image
                src="/ri_discord-line.svg"
                width={20}
                height={20}
                alt="discord-logo"
                loading="eager"
              />
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mx-1 flex items-center justify-center"
          >
            <Link href="https://medium.com/@bucketprotocol" target="_blank">
              <Image
                src="/simple-icons_medium.svg"
                width={20}
                height={20}
                alt="medium-logo"
                loading="eager"
              />
            </Link>
          </motion.div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
