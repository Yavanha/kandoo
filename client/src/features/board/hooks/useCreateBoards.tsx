import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Board, CreateBoardFields } from "../types";
import { post } from "@/core/api";
import { GET_BOARDS_CACHE_KEY } from "../constants/constants";
import { AxiosError } from "axios";
import { AxioResponsError } from "@/core/types";

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    Board,
    AxiosError<AxioResponsError>,
    CreateBoardFields,
    unknown
  >({
    mutationFn: async (data: CreateBoardFields) => {
      return await post<Board, CreateBoardFields>("/boards", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_BOARDS_CACHE_KEY] });
    },
  });
  return {
    createBoardMutation: mutation,
  };
};
