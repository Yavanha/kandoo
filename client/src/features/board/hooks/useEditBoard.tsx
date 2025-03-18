import { patch } from "@/core/api";
import { AxioResponsError } from "@/core/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Board, UpdateBoardType } from "../types";
import { useNavigate } from "@tanstack/react-router";
import { GET_BOARD_CACHE_KEY } from "../constants";

export const useEditBoard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation<
    Board,
    AxiosError<AxioResponsError>,
    UpdateBoardType,
    unknown
  >({
    mutationFn: async (data: UpdateBoardType) => {
      return await patch<Board, UpdateBoardType>(`/boards/${data.id}`, {
        name: data.name,
        columns: data.columns,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [GET_BOARD_CACHE_KEY, data.id],
      });
      navigate({
        to: "/boards/$id",
        params: {
          id: data.id,
        },
      });
    },
  });
  return {
    updateBoardMutation: mutation,
  };
};
