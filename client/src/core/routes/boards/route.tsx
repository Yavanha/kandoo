import { getBoardsQueryOptions } from "@/features/board/hooks/useBoards";

import { createFileRoute } from "@tanstack/react-router";
import { Button, Toolbar } from "@radix-ui/react-toolbar";

export const Route = createFileRoute("/boards")({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(getBoardsQueryOptions);
  },
  pendingComponent: () => (
    <Toolbar className="sticky top-0 left-0 flex items-center bg-white px-4 py-5 justify-between">
      <div className="flex items-center gap-4">
        <Button role="menu">
          <img src="/icons/logo-mobile.svg" alt="menu" />
        </Button>
        <div>loading...</div>
      </div>
    </Toolbar>
  ),
});
