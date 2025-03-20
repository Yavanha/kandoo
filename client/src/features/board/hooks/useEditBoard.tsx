import { patch } from "@/core/api";
import { AxioResponsError } from "@/core/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Board, UpdateBoardType } from "../types";
import { GET_BOARDS_CACHE_KEY } from "../constants";

export const useEditBoard = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    Board,
    AxiosError<AxioResponsError>,
    UpdateBoardType,
    unknown
  >({
    mutationFn: async (data: UpdateBoardType) => {
      const { id, ...updateBoard } = data;
      return await patch<Board, UpdateBoardType>(`/boards/${id}`, updateBoard);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes(GET_BOARDS_CACHE_KEY),
      });
    },
  });
  return {
    updateBoardMutation: mutation,
  };
};
