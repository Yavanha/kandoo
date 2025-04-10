import { queryOptions } from "@tanstack/react-query";
import { GET_TASKS_QUERY_KEY_BY_BOARD_COLUMN_ID } from "../constants";
import { atomWithSuspenseQuery } from "jotai-tanstack-query";
import { getTasksByBoardColumnId } from "../services/api";
import { boardColumnId } from "@/features/board-column/store/atoms";

export const getTasksByBoardColumnOptions = (columnId: string | null) =>
  queryOptions({
    queryKey: [GET_TASKS_QUERY_KEY_BY_BOARD_COLUMN_ID, columnId],
    queryFn: async ({ queryKey: [, id] }) => {
      if (!id) return null;
      return getTasksByBoardColumnId(id);
    },
  });

export const tasksByBoardColumnIdAtom = atomWithSuspenseQuery((get) =>
  getTasksByBoardColumnOptions(get(boardColumnId))
);
