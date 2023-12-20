import Image from "next/image";
import { useEffect, useState } from "react";

const Preloader = (): any => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);
  return (
    showLoader && (
      <div className=" z-[999] flex h-screen w-screen items-center justify-center bg-[#0a4e7a]">
        <Image
          src="/bijective-animation.gif"
          alt="logo"
          width={200}
          height={200}
        />
      </div>
    )
  );
};

export default Preloader;
