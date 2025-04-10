import { useAtom, useSetAtom } from "jotai";
import {
  isOpenTaskDropdownMenuAtom,
  triggerEditTaskFormDialogAtom,
  triggerDeleteTaskFormDialogAtom,
} from "../store/atoms";
import { DialogTrigger, DropdownMenu } from "@/core/components";

import { Item } from "@radix-ui/react-dropdown-menu";
import {
  TASK_DROPDOWN_MENU_EDIT_TEXT,
  TASK_DROPDOWN_MENU_DELETE_TEXT,
} from "../constants";

export const TaskDropdownMenu = () => {
  const [isOpenTaskDropdownMenu, setIsOpenTaskDropdownMenu] = useAtom(
    isOpenTaskDropdownMenuAtom
  );
  const triggerEditTaskFormDialog = useSetAtom(triggerEditTaskFormDialogAtom);
  const triggerDeleteTaskFormDialog = useSetAtom(
    triggerDeleteTaskFormDialogAtom
  );

  return (
    <DropdownMenu
      isOpen={isOpenTaskDropdownMenu}
      onOpenChange={setIsOpenTaskDropdownMenu}
    >
      <Item asChild>
        <DialogTrigger openDialog={triggerEditTaskFormDialog}>
          <p className="text-medium-grey body-l mb-4 cursor-pointer">
            {TASK_DROPDOWN_MENU_EDIT_TEXT}
          </p>
        </DialogTrigger>
      </Item>
      <Item>
        <DialogTrigger openDialog={triggerDeleteTaskFormDialog}>
          <p className="text-destructive body-l cursor-pointer">
            {TASK_DROPDOWN_MENU_DELETE_TEXT}
          </p>
        </DialogTrigger>
      </Item>
    </DropdownMenu>
  );
};
