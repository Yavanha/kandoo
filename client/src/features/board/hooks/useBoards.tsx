import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { GET_BOARDS_CACHE_KEY } from "../constants/constants";
import { getBoards } from "../services/api";

export const getBoardQueryOptions = queryOptions({
  queryKey: [GET_BOARDS_CACHE_KEY],
  queryFn: getBoards,
});

export const useBoards = () => {
  const { data: boards } = useSuspenseQuery(getBoardQueryOptions);

  return boards;
};
