import { useAtom, useAtomValue } from "jotai";
import { boardFormModeAtom, isOpenBoardDialogAtom } from "../store/atoms";
import { Dialog } from "@/core/components";

import { BoardActionMode } from "../types";
import { ReactElement } from "react";
import { CreateBoardForm } from "./CreateBoardForm";
import { EditBoardForm } from "./EditBoardForm";

const boardFormMap = new Map<
  BoardActionMode,
  { element: ReactElement; dialogTitle: string }
>([
  ["CREATE", { element: <CreateBoardForm />, dialogTitle: "Add New Board" }],
  ["EDIT", { element: <EditBoardForm />, dialogTitle: "Edit Board" }],
]);

export const BoardDialog = () => {
  const [isOpenBoardDialog, setIsOpenBoardDialog] = useAtom(
    isOpenBoardDialogAtom
  );

  const boardFormMode = useAtomValue(boardFormModeAtom);

  const boardFormInfo = boardFormMap.get(boardFormMode);

  return (
    boardFormInfo && (
      <Dialog
        isOpen={isOpenBoardDialog}
        onOpenChange={setIsOpenBoardDialog}
        title={boardFormInfo.dialogTitle}
      >
        {boardFormInfo.element}
      </Dialog>
    )
  );
};
