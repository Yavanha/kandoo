import { patch } from "@/core/api";
import { AxiosResponseError } from "@/core/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Board, UpdateBoardType } from "../types";
import { GET_BOARD_CACHE_KEY, GET_BOARDS_CACHE_KEY } from "../constants";

export const useEditBoard = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    Board,
    AxiosError<AxiosResponseError>,
    UpdateBoardType,
    unknown
  >({
    mutationFn: async (data: UpdateBoardType) => {
      const { id, ...updateBoard } = data;
      return await patch<Board, UpdateBoardType>(`/boards/${id}`, updateBoard);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === GET_BOARDS_CACHE_KEY ||
          (query.queryKey[0] === GET_BOARD_CACHE_KEY &&
            query.queryKey[1] === data.id),
      });
    },
  });
  return {
    updateBoardMutation: mutation,
  };
};
