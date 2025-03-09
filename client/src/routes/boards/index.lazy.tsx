import { createLazyFileRoute } from "@tanstack/react-router";
import { BoardComponent } from "@/features/board/Board";

export const Route = createLazyFileRoute("/boards/")({
  component: BoardComponent,
});
