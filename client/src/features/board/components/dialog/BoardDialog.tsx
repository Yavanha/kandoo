import { useAtom, useAtomValue } from "jotai";
import { boardFormModeAtom, isOpenBoardDialogAtom } from "../../store/atoms";
import { Dialog } from "@/core/components";

import { useBoardFormMap } from "../../hooks";

export const BoardDialog = () => {
  const [isOpenBoardDialog, setIsOpenBoardDialog] = useAtom(
    isOpenBoardDialogAtom
  );

  const boardFormMode = useAtomValue(boardFormModeAtom);
  const { boardFormMap } = useBoardFormMap();

  const boardFormInfo = boardFormMap.get(boardFormMode);

  return (
    boardFormInfo && (
      <Dialog
        isOpen={isOpenBoardDialog}
        onOpenChange={setIsOpenBoardDialog}
        title={boardFormInfo.dialogTitle}
        isDanger={boardFormMode === "DELETE"}
      >
        {boardFormInfo.element}
      </Dialog>
    )
  );
};
