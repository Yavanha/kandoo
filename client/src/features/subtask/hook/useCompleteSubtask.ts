import { patch } from "@/core/api";
import { AxiosResponseError } from "@/core/types";
import { GET_BOARD_CACHE_KEY } from "@/features/board/constants";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CompleteSubtask, Subtask } from "../types/";
import { useBoard } from "@/features/board/hooks";
import { BoardNotFoundException } from "@/features/board/exceptions";

export const useCompleteSubtask = () => {
  const queryClient = useQueryClient();
  const activeBoard = useBoard();
  if (!activeBoard) {
    throw new BoardNotFoundException();
  }
  const mutation = useMutation<
    Subtask,
    AxiosError<AxiosResponseError>,
    CompleteSubtask
  >({
    mutationFn: async ({ id: subtaskId, isCompleted }: CompleteSubtask) => {
      return await patch<Subtask, Partial<Subtask>>(`/subtasks/${subtaskId}/`, {
        isCompleted,
      });
    },

    onSuccess() {
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === GET_BOARD_CACHE_KEY &&
          query.queryKey[1] === activeBoard.id,
      });
    },
  });
  return {
    completeSubtaskMutation: mutation,
  };
};
