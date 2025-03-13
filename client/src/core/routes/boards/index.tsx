import { getBoardQueryOptions } from "@/features/board/hooks/useBoards";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/boards/")({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(getBoardQueryOptions);
  },
  pendingComponent: () => <div>Loading...</div>,
});
