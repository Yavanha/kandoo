import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Board, CreateBoardType } from "../types";
import { post } from "@/core/api";
import { GET_BOARDS_CACHE_KEY } from "../constants/constants";
import { AxiosError } from "axios";
import { AxioResponsError } from "@/core/types";

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    Board,
    AxiosError<AxioResponsError>,
    CreateBoardType
  >({
    mutationFn: async (data: CreateBoardType) => {
      return await post<Board, CreateBoardType>("/boards", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_BOARDS_CACHE_KEY] });
    },
  });
  return {
    createBoardMutation: mutation,
  };
};
