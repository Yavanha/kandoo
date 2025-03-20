import { DialogTrigger } from "@/core/components/dialog/DialogTrigger";
import { BoardDialog, BoardSelect } from "@/features/board/components";
import { BoardDropdownMenu } from "@/features/board/components/BoardDropdownMenu";
import { useBoard } from "@/features/board/hooks";
import { useBoards } from "@/features/board/hooks/useBoards";
import { triggerCreateFormDialogAtom } from "@/features/board/store/atoms";
import { Board } from "@/features/board/types";
import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { Toolbar } from "radix-ui";
import { Suspense } from "react";

export const Route = createLazyFileRoute("/boards")({
  component: Index,
});

/**
 * Renders the board management interface.
 *
 * This component displays a toolbar that includes a logo button and either a board selection dropdown (if boards are available)
 * or a trigger to open a dialog for creating a new board. It also provides a button for adding new tasks—which is disabled if the
 * active board has no columns—and optionally shows a board dropdown menu when an active board is present. Additionally, it renders
 * nested routes and a dialog for board management within a Suspense wrapper to handle asynchronous loading states.
 *
 * @returns The JSX element representing the board management UI.
 */
export function Index() {
  const boards: Board[] = useBoards();
  const activeBoard = useBoard();
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
    <Suspense fallback={<div>Suspense</div>}>
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
      <Outlet />
      <BoardDialog />
    </Suspense>
  );
}
