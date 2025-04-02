import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Task,
  CreateTask,
  CreateTaskMutationDataType,
} from "../types/task.type";
import { post } from "@/core/api";
import { AxiosError } from "axios";
import { AxiosResponseError } from "@/core/types";
import { GET_BOARD_CACHE_KEY } from "@/features/board/constants";

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    Task,
    AxiosError<AxiosResponseError>,
    CreateTaskMutationDataType
  >({
    mutationFn: async ({ data, columnId }: CreateTaskMutationDataType) => {
      return await post<Task, CreateTask>(`/columns/${columnId}/tasks`, data);
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
    createTaskMutation: mutation,
  };
};
