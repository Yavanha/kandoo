import { createFileRoute } from "@tanstack/react-router";
import { getBoards } from "@/features/board/queries";

export const Route = createFileRoute("/boards/")({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(getBoards);
  },
  pendingComponent: () => <div>Loading...</div>,
});
