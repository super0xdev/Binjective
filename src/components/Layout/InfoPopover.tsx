import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

type Props = {
  title: string;
  description: string;
  textSize?: string;
};

const InfoPopover = ({ title, description, textSize }: Props) => {
  const [openPopover, setOpenPopover] = useState(false);
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };
  return (
    <Popover open={openPopover} handler={setOpenPopover}>
      <div
        className={`flex items-center justify-start space-x-1 sm:justify-center ${
          textSize || ""
        }`}
      >
        <div>{title}</div>
        <PopoverHandler {...triggers}>
          <div>
            <AiOutlineQuestionCircle />
          </div>
        </PopoverHandler>
      </div>

      <PopoverContent {...triggers} className="max-w-[26rem] bg-white shadow-2xl">
        <div className="mb-2 flex items-center gap-3">
          <Typography
            color="blue-gray"
            className="text-lg font-bold"
          >
            {title}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal"
        >
          {description}
        </Typography>
      </PopoverContent>
    </Popover>
  );
};

export default InfoPopover;
