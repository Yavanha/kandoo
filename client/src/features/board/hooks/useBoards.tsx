import { atomWithSuspenseQuery } from "jotai-tanstack-query";
import { GET_BOARDS_CACHE_KEY } from "../constants/constants";
import { getBoards } from "../services/api";
import { useAtom } from "jotai";
import { queryOptions } from "@tanstack/react-query";

export const getBoardsQueryOptions = queryOptions({
  queryKey: [GET_BOARDS_CACHE_KEY],
  queryFn: getBoards,
});

const boardsAtoms = atomWithSuspenseQuery(() => getBoardsQueryOptions);

export const useBoards = () => {
  const [{ data: boards }] = useAtom(boardsAtoms);

  return boards;
};
