import { cn } from "~/lib/utils/cn";
import { motion } from "framer-motion";

interface ButtonProps {
  type: "primary" | "secondary" | "tertiary";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  type,
  children,
  className,
  onClick,
  disabled,
}: ButtonProps) => {
  let colorStyle = "";

  switch (type) {
    case "secondary":
      colorStyle =
        "bg-white text-primary-default border-primary-default border-[1px]";
      break;
    case "tertiary":
      colorStyle = "bg-primary-light2 text-primary-dark2";
      break;
    case "primary":
      colorStyle = "bg-primary-default text-white";
      break;
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.5 }}
      // className={cn(
      //   colorStyle,
      //   "h-[45px] w-[130px] rounded-xl bg-[#2e79dc]",
      //   className
      // )}
      className="h-[45px] w-[130px] rounded-xl bg-[#2e79dc] font-semibold text-white"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};
