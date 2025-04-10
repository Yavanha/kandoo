import {
  DropdownMenu as RadixDropdownMenu,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { FC, PropsWithChildren } from "react";

type DropdownMenuProps = {
  isOpen?: boolean;
  onOpenChange: (open: boolean) => void;
  align?: "start" | "center" | "end";
  sideOffset?: number;
  className?: string;
} & PropsWithChildren;

export const DropdownMenu: FC<DropdownMenuProps> = ({
  isOpen,
  onOpenChange,
  align = "end",
  sideOffset = 25,
  className = "",
  children,
}) => {
  return (
    <RadixDropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger className="cursor-pointer px-2">
        <img src="/icons/icon-vertical-ellipsis.svg" alt="more options" />
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent
          className={`p-4 min-w-[220px] rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade ${className}`}
          sideOffset={sideOffset}
          align={align}
        >
          {children}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </RadixDropdownMenu>
  );
};
