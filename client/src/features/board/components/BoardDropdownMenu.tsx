import {
  Content,
  DropdownMenu,
  Item,
  Portal,
  Trigger,
} from "@radix-ui/react-dropdown-menu";
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
    <DropdownMenu
      open={isOpenBoardDropdownMenu}
      onOpenChange={setIsOpenBoardDropdownMen}
    >
      <Trigger className="select-none cursor-pointer ">
        <img src="/icons/icon-vertical-ellipsis.svg" alt="more options" />
      </Trigger>

      <Portal>
        <Content
          className="p-4 min-w-[220px] rounded-md bg-white  shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
          sideOffset={25}
          align="end"
        >
          <Item asChild>
            <DialogTrigger openDialog={triggerEditFormDialog}>
              <p className="text-medium-grey body-l mb-4 cursor-pointer">
                Edit New Board
              </p>
            </DialogTrigger>
          </Item>
          <Item>
            <DialogTrigger openDialog={triggerDeleteFormDialog}>
              <p className="text-destructive body-l cursor-pointer">
                Delete Board
              </p>
            </DialogTrigger>
          </Item>
        </Content>
      </Portal>
    </DropdownMenu>
  );
};
