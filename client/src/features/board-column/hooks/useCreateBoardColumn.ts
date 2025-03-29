import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BoardColumn } from "../types";
import { AxiosError } from "axios";
import { AxiosResponseError } from "@/core/types";
import { GET_BOARD_CACHE_KEY } from "@/features/board/constants";
import { post } from "@/core/api";

export const useCreateBoardColumn = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    BoardColumn,
    AxiosError<AxiosResponseError>,
    Pick<BoardColumn, "boardId" | "title">
  >({
    mutationFn: async (data: Pick<BoardColumn, "boardId" | "title">) => {
      return await post<BoardColumn, Pick<BoardColumn, "title">>(
        `/boards/${data.boardId}/columns`,
        {
          title: data.title,
        }
      );
    },
    onSuccess: (data) => {
      console.log("data", data);
      queryClient.invalidateQueries({
        queryKey: [GET_BOARD_CACHE_KEY, data.boardId],
      });
    },
  });

  return {
    createBoardColumnMutation: mutation,
  };
};
