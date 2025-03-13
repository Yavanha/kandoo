import { FC } from "react";
import classNames from "classnames";
import { Dialog } from "@/core/components/dialog/Dialog";
import { BoardForm } from "./BoardForm";

type BoardCreateButtonDialogProps = {
  onTrigger: (isOpen: boolean) => void;
  isOpenDialog: boolean;
  hasFlushEdges?: boolean;
};

export const BoardTriggerDialogForm: FC<BoardCreateButtonDialogProps> = ({
  onTrigger: triggerDialogHandler,
  isOpenDialog,
  hasFlushEdges = false,
}) => {
  return (
    <>
      <button
        className={classNames("flex items-center gap-x-2 cursor-pointer", {
          "px-6  py-3": hasFlushEdges,
        })}
        onClick={() => triggerDialogHandler(true)}
      >
        {hasFlushEdges && (
          <img src="/icons/icon-board.svg" alt="board icon" className="block" />
        )}
        <p className="capitalize heading-m flex items-center gap-x-0.5 text-primary">
          <span className="inline-block align-middle">+</span> Create New Board
        </p>
      </button>
      <Dialog
        isOpen={isOpenDialog}
        onOpenChange={triggerDialogHandler}
        title="Add New Board"
      >
        <BoardForm onCloseDialog={() => triggerDialogHandler(false)} />
      </Dialog>
    </>
  );
};
