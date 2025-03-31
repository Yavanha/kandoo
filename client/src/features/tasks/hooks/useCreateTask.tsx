import { useMutation } from "@tanstack/react-query";
import { Task, CreateTaskType } from "../types/task.type";
import { post } from "@/core/api";
import { AxiosError } from "axios";
import { AxiosResponseError } from "@/core/types";

export const useCreateTask = () => {
  const mutation = useMutation<
    Task,
    AxiosError<AxiosResponseError>,
    CreateTaskType
  >({
    mutationFn: async (data: CreateTaskType) => {
      return await post<Task, CreateTaskType>(
        `/column/${data.columnId}/tasks`,
        data
      );
    },
  });
  return {
    createTaskMutation: mutation,
  };
};
