import { useAtom, useSetAtom } from "jotai";
import {
  isOpenBoardDropdownMenuAtom,
  triggerEditFormDialogAtom,
  triggerDeleteFormDialogAtom,
} from "../store/atoms";
import { DialogTrigger, DropdownMenu } from "@/core/components";

import { Item } from "@radix-ui/react-dropdown-menu";
import {
  BOARD_DROPDOWN_MENU_EDIT_TEXT,
  BOARD_DROPDOWN_MENU_DELETE_TEXT,
} from "../constants";

export const BoardDropdownMenu = () => {
  const [isOpenBoardDropdownMenu, setIsOpenBoardDropdownMenu] = useAtom(
    isOpenBoardDropdownMenuAtom
  );
  const triggerEditFormDialog = useSetAtom(triggerEditFormDialogAtom);
  const triggerDeleteFormDialog = useSetAtom(triggerDeleteFormDialogAtom);

  return (
    <DropdownMenu
      isOpen={isOpenBoardDropdownMenu}
      onOpenChange={setIsOpenBoardDropdownMenu}
    >
      <Item asChild>
        <DialogTrigger openDialog={triggerEditFormDialog}>
          <p className="text-medium-grey body-l mb-4 cursor-pointer">
            {BOARD_DROPDOWN_MENU_EDIT_TEXT}
          </p>
        </DialogTrigger>
      </Item>
      <Item>
        <DialogTrigger openDialog={triggerDeleteFormDialog}>
          <p className="text-destructive body-l cursor-pointer">
            {BOARD_DROPDOWN_MENU_DELETE_TEXT}
          </p>
        </DialogTrigger>
      </Item>
    </DropdownMenu>
  );
};
