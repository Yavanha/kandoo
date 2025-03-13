import { BoardSelect } from "@/features/board/components";
import { useBoards } from "@/features/board/hooks/useBoards";
import { useBoardStore } from "@/features/board/store/board.store";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Toolbar } from "radix-ui";
import { useEffect, Suspense } from "react";

export const Route = createLazyFileRoute("/boards/")({
  component: Index,
});

export function Index() {
  const boards = useBoards();
  const activeBoard = useBoardStore((state) => state.activeBoard);
  const setActiveBoard = useBoardStore((state) => state.setActiveBoard);

  useEffect(() => {
    if (boards.length > 0) {
      setActiveBoard(boards[0]);
    }
  }, [boards, setActiveBoard]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Toolbar.Root className="sticky top-0 left-0 flex items-center bg-white px-4 py-5 justify-between">
        <div className="flex items-center gap-4">
          <Toolbar.Button role="menu">
            <img src="/icons/logo-mobile.svg" alt="menu" />
          </Toolbar.Button>
          <BoardSelect boards={boards} />
        </div>
        <div className="flex items-center gap-x-4">
          <Toolbar.Button
            role="add new tasks to board"
            disabled={activeBoard?.columns.length === 0}
            className="bg-primary py-2.5 px-5  rounded-full disabled:bg-primary-hover"
          >
            <img src="/icons/icon-add-task-mobile.svg" alt="add task" />
          </Toolbar.Button>
          <Toolbar.Button role="more options">
            <img src="/icons/icon-vertical-ellipsis.svg" alt="more options" />
          </Toolbar.Button>
        </div>
      </Toolbar.Root>
    </Suspense>
  );
}
