import { getBoardQueryOptions } from "@/features/board/hooks/useBoard";
import { boardIdAtom } from "@/features/board/store/atoms";

import {
  createFileRoute,
  notFound,
  NotFoundRouteProps,
  useParams,
} from "@tanstack/react-router";
const NotFoundBoardComponent = (props: NotFoundRouteProps) => {
  const { data } = props as {
    data: {
      isNotFound: boolean;
      routeId: "/boards/$id";
    };
  };
  const { id } = useParams({
    from: data.routeId,
  });
  return (
    <>
      <div>not found {id}</div>
    </>
  );
};

export const Route = createFileRoute("/boards/$id")({
  loader: async ({ context: { queryClient, store }, params }) => {
    const boardId = params.id;
    const board = await queryClient.ensureQueryData(
      getBoardQueryOptions(boardId)
    );
    if (!board) throw notFound();

    store.set(boardIdAtom, board.id);

    return board;
  },
  notFoundComponent: NotFoundBoardComponent,
  onError() {
    throw notFound();
  },
  pendingComponent: () => <div>Loading...</div>,
});
