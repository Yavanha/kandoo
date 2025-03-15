import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Board, CreateBoardType } from "../types";
import { post } from "@/core/api";
import { GET_BOARDS_CACHE_KEY } from "../constants/constants";
import { AxiosError } from "axios";
import { AxioResponsError } from "@/core/types";
import { useSetAtom } from "jotai";
import { activeBoardAtom } from "../store/atoms";

export const useCreateBoard = () => {
  const queryClient = useQueryClient();
  const setActiveBoard = useSetAtom(activeBoardAtom);

  const mutation = useMutation<
    Board,
    AxiosError<AxioResponsError>,
    CreateBoardType
  >({
    mutationFn: async (data: CreateBoardType) => {
      return await post<Board, CreateBoardType>("/boards", data);
    },
    onSuccess: (data) => {
      setActiveBoard(data);
      queryClient.invalidateQueries({ queryKey: [GET_BOARDS_CACHE_KEY] });
    },
  });
  return {
    createBoardMutation: mutation,
  };
};
