import { BoardColumns } from "@/features/board-column/components";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/boards/$id")({
  component: Board,
});

/**
 * Renders the board interface by displaying the board columns.
 *
 * This component serves as the lazy-loaded route for the board view, returning a React fragment
 * that contains the BoardColumns component.
 */
function Board() {
  return (
    <>
      <BoardColumns />
    </>
  );
}
