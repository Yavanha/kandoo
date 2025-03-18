import { atomWithSuspenseQuery } from "jotai-tanstack-query";
import { GET_BOARD_CACHE_KEY } from "../constants";
import { getBoard } from "../services/api";
import { queryOptions } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { boardIdAtom } from "../store/atoms";

export const getBoardQueryOptions = (boardId: string | null) =>
  queryOptions({
    queryKey: [GET_BOARD_CACHE_KEY, boardId],
    queryFn: async ({ queryKey: [, id] }) => {
      if (!id) return null;
      return getBoard(id);
    },
  });

export const boardAtom = atomWithSuspenseQuery((get) =>
  getBoardQueryOptions(get(boardIdAtom))
);

export const useBoard = () => {
  const atomValue = useAtom(boardAtom);

  return atomValue[0] ? atomValue[0].data : null;
};
