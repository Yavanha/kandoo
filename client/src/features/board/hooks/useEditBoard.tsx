import { patch } from "@/core/api";
import { AxioResponsError } from "@/core/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Board, UpdateBoardType } from "../types";
import { useSetAtom } from "jotai";
import { GET_BOARDS_CACHE_KEY } from "../constants/constants";
import { activeBoardAtom } from "../store/atoms";

export const useEditBoard = () => {
  const queryClient = useQueryClient();
  const setActiveBoard = useSetAtom(activeBoardAtom);
  const mutation = useMutation<
    Board,
    AxiosError<AxioResponsError>,
    UpdateBoardType,
    unknown
  >({
    mutationFn: async (data: UpdateBoardType) => {
      return await patch<Board, UpdateBoardType>(`/boards/${data.id}`, data);
    },
    onSuccess: (data) => {
      setActiveBoard(data);
      queryClient.invalidateQueries({ queryKey: [GET_BOARDS_CACHE_KEY] });
    },
  });
  return {
    updateBoardMutation: mutation,
  };
};
