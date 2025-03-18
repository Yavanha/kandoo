import { store } from "@/core/config/store.config";
import { getBoardQueryOptions } from "@/features/board/hooks/useBoard";
import { boardIdAtom } from "@/features/board/store/atoms";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/boards/$id")({
  loader: ({ context: { queryClient }, params }) => {
    const boardId = params.id;
    store.set(boardIdAtom, params.id);
    return queryClient.ensureQueryData(getBoardQueryOptions(boardId));
  },
  pendingComponent: () => <div>Loading...</div>,
});
