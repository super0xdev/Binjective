import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

type Props = {
  content: string;
};

const AmountPopover = ({ content }: Props) => {
  return (
    <Popover
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 10 },
      }}
    >
      <PopoverHandler>
        <div className="flex items-center hover:cursor-pointer">
          <AiOutlineQuestionCircle height={10} width={10} />
        </div>
      </PopoverHandler>
      <PopoverContent className="z-50 bg-gray-800 text-white">
        {content}
      </PopoverContent>
    </Popover>
  );
};

export default AmountPopover;
