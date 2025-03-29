import { BoardColumnList } from "@/features/board-column/components";
import { useBoard } from "@/features/board/hooks";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/boards/$id")({
  component: Board,
});

function Board() {
  const activeBoard = useBoard();
  return <>{activeBoard && <BoardColumnList list={activeBoard.columns} />}</>;
}
