import { DropdownMenu } from "radix-ui";
import { useAtom, useSetAtom } from "jotai";
import {
  isOpenBoardDropdownMenuAtom,
  triggerEditFormDialogAtom,
  triggerDeleteFormDialogAtom,
} from "../store/atoms";
import { DialogTrigger } from "@/core/components";

export const BoardDropdownMenu = () => {
  const [isOpenBoardDropdownMenu, setIsOpenBoardDropdownMen] = useAtom(
    isOpenBoardDropdownMenuAtom
  );
  const triggerEditFormDialog = useSetAtom(triggerEditFormDialogAtom);
  const triggerDeleteFormDialog = useSetAtom(triggerDeleteFormDialogAtom);

  return (
    <DropdownMenu.Root
      open={isOpenBoardDropdownMenu}
      onOpenChange={setIsOpenBoardDropdownMen}
    >
      <DropdownMenu.Trigger className="select-none cursor-pointer">
        <img src="/icons/icon-vertical-ellipsis.svg" alt="more options" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="p-4 min-w-[220px] rounded-md bg-white  shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
          sideOffset={25}
          align="end"
        >
          <DropdownMenu.Item asChild>
            <DialogTrigger openBoardDialog={triggerEditFormDialog}>
              <p className="text-medium-grey body-l mb-4 cursor-pointer">
                Edit New Board
              </p>
            </DialogTrigger>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <DialogTrigger openBoardDialog={triggerDeleteFormDialog}>
              <p className="text-destructive body-l cursor-pointer">
                Delete Board
              </p>
            </DialogTrigger>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
