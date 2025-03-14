import { BoardForm } from "./BoardForm";
import { useAtom } from "jotai";
import { isOpenBoardDialogAtom } from "../store/atoms";
import { Dialog } from "@/core/components";

export const BoardDialog = () => {
  const [isOpenBoardDialog, setIsOpenBoardDialog] = useAtom(
    isOpenBoardDialogAtom
  );

  return (
    <Dialog
      isOpen={isOpenBoardDialog}
      onOpenChange={setIsOpenBoardDialog}
      title="Add New Board"
    >
      <BoardForm />
    </Dialog>
  );
};
