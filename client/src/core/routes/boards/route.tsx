import { getBoardsQueryOptions } from "@/features/board/hooks/useBoards";

import { createFileRoute } from "@tanstack/react-router";
import { Toolbar } from "radix-ui";

export const Route = createFileRoute("/boards")({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(getBoardsQueryOptions);
  },
  pendingComponent: () => (
    <Toolbar.Root className="sticky top-0 left-0 flex items-center bg-white px-4 py-5 justify-between">
      <div className="flex items-center gap-4">
        <Toolbar.Button role="menu">
          <img src="/icons/logo-mobile.svg" alt="menu" />
        </Toolbar.Button>
        <div>loading...</div>
      </div>
    </Toolbar.Root>
  ),
});
