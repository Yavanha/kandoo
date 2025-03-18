import { BoardColumns } from "@/features/board-column/components";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/boards/$id")({
  component: Board,
});

function Board() {
  return (
    <>
      <BoardColumns />
    </>
  );
}
