import { queryOptions } from "@tanstack/react-query";
import { Board } from "src/features/board/type";
import { get } from "@/helpers/api-helpers";

export const GET_BOARDS = "GET_BOARDS";
export const getBoards = queryOptions({
  queryKey: [GET_BOARDS],
  queryFn: async () => {
    const boards = await get<Board[]>("/boards");
    return boards;
  },
});
