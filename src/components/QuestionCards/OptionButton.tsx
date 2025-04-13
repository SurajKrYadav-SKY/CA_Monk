import { memo } from "react";
import { Button } from "../ui/button";

interface OptionButtonProps {
  option: string;
  onClick: () => void;
  disabled: boolean;
}

const OptionButton = ({ option, onClick, disabled }: OptionButtonProps) => (
  <Button
    onClick={onClick}
    className="w-full bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-500 cursor-pointer"
    disabled={disabled}
    aria-label={`Select option ${option}`}
  >
    {option}
  </Button>
);

//memoizing to prevent unnecessary re-render
export default memo(OptionButton);
