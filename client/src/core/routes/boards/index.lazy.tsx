import { DialogTrigger } from "@/core/components/dialog/DialogTrigger";
import { BoardColumns } from "@/features/board-column/components";
import { BoardSelect } from "@/features/board/components";
import { BoardDialog } from "@/features/board/components/BoardDialog";
import { BoardDropdownMenu } from "@/features/board/components/BoardDropdownMenu";
import { useBoards } from "@/features/board/hooks/useBoards";
import {
  activeBoardAtom,
  triggerCreateFormDialogAtom,
} from "@/features/board/store/atoms";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useAtomValue, useSetAtom } from "jotai";
import { Toolbar } from "radix-ui";
import { Suspense } from "react";

export const Route = createLazyFileRoute("/boards/")({
  component: Index,
});

export function Index() {
  const boards = useBoards();
  const activeBoard = useAtomValue(activeBoardAtom);
  const triggerCreateFormDialog = useSetAtom(triggerCreateFormDialogAtom);

  let selectOrDialogTrigger = (
    <DialogTrigger openBoardDialog={triggerCreateFormDialog}>
      <p className="capitalize heading-m flex items-center gap-x-0.5 text-primary">
        <span className="inline-block align-middle">+</span> Create New Board
      </p>
    </DialogTrigger>
  );

  if (boards.length > 0) {
    selectOrDialogTrigger = <BoardSelect boards={boards} />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Toolbar.Root className="sticky top-0 left-0 flex items-center bg-white px-4 py-5 justify-between">
        <div className="flex items-center gap-4">
          <Toolbar.Button role="menu">
            <img src="/icons/logo-mobile.svg" alt="menu" />
          </Toolbar.Button>
          {selectOrDialogTrigger}
        </div>
        <div className="flex items-center gap-x-4">
          <Toolbar.Button
            role="add new tasks to board"
            disabled={activeBoard?.columns.length === 0}
            className="bg-primary py-2.5 px-5  rounded-full disabled:bg-primary-hover"
          >
            <img src="/icons/icon-add-task-mobile.svg" alt="add task" />
          </Toolbar.Button>
          {activeBoard != null && <BoardDropdownMenu />}
        </div>
      </Toolbar.Root>
      <BoardColumns />
      <BoardDialog />
    </Suspense>
  );
}
