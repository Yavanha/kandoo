import { patch } from "@/core/api";
import { AxiosResponseError } from "@/core/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Task, UpdateTask, UpdateTaskMutationDataType } from "../types";
import { GET_BOARD_CACHE_KEY } from "@/features/board/constants";

export const useEditTask = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    Task,
    AxiosError<AxiosResponseError>,
    UpdateTaskMutationDataType
  >({
    mutationFn: async ({ data }) => {
      return await patch<Task, UpdateTask>(
        `/columns/${data.columnId}/tasks/${data.id}`,
        data
      );
    },
    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === GET_BOARD_CACHE_KEY &&
          query.queryKey[1] === variables.boardId,
      });
    },
  });

  return {
    editTaskMutation: mutation,
  };
};
