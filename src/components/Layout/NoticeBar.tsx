import { cn } from "~/lib/utils/cn";
import Link from "next/link";
import Image from "next/image";

const NoticeBar = () => {
  return (
    <div className="fixed top-21 z-10 flex h-16 w-full items-center justify-center bg-primary-dark">
      {/* <Link href={"#"} target="_blank"> */}
      <div
        // href={"#"}
        className="flex items-center justify-center lg:justify-between lg:gap-4"
      ></div>
    </div>
  );
};

export default NoticeBar;
