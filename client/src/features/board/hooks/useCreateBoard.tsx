import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Board, CreateBoardType } from "../types";
import { post } from "@/core/api";
import { GET_BOARDS_CACHE_KEY } from "../constants/constants";
import { AxiosError } from "axios";
import { AxiosResponseError } from "@/core/types";

import { useNavigate } from "@tanstack/react-router";

export const useCreateBoard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation<
    Board,
    AxiosError<AxiosResponseError>,
    CreateBoardType
  >({
    mutationFn: async (data: CreateBoardType) => {
      return await post<Board, CreateBoardType>("/boards", data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [GET_BOARDS_CACHE_KEY],
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
    createBoardMutation: mutation,
  };
};
