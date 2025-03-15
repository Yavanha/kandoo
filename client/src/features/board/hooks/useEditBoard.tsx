import { patch } from "@/core/api";
import { AxioResponsError } from "@/core/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Board, UpdateBoardType } from "../types";

export const useEditBoard = () => {
  const mutation = useMutation<
    Board,
    AxiosError<AxioResponsError>,
    UpdateBoardType,
    unknown
  >({
    mutationFn: async (data: UpdateBoardType) => {
      return await patch<Board, UpdateBoardType>(`/boards/${data.id}`, data);
    },
  });
  return {
    updateBoardMutation: mutation,
  };
};
