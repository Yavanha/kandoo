import { SubmitHandler, useForm, UseFormProps } from "react-hook-form";
import { TaskFormType, CreateTaskMutationDataType } from "../types/task.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTask } from "./useCreateTask";
import { useTaskMutationOptions } from "./useTaskMutationOptions";
import { TaskFormSchema } from "../schemas";
import { useBoard } from "@/features/board/hooks";

export const useCreateTaskForm = () => {
  const { createTaskMutation } = useCreateTask();
  const activeBoard = useBoard();
  const defaultValues: TaskFormType = {
    title: "",
    description: "",
    status: "",
    list: [],
  };
  const formProps: UseFormProps<TaskFormType> = {
    defaultValues,
    resolver: zodResolver(TaskFormSchema),
    shouldFocusError: true,
  };
  const form = useForm<TaskFormType>(formProps);
  const { reset, setError } = form;
  const options = useTaskMutationOptions<
    CreateTaskMutationDataType,
    TaskFormType
  >(reset, setError, defaultValues);
  const onSubmit: SubmitHandler<TaskFormType> = ({
    title,
    description,
    status,
    list,
  }) => {
    if (!activeBoard) return;
    const { columns, id: boardId } = activeBoard;
    const columnId = columns.find((column) => column.title === status)?.id;
    if (!columnId) return;
    createTaskMutation.mutate(
      {
        data: {
          title,
          description,
          status,
          subtasks: list.map((list) => ({
            title: list.title,
          })),
        },
        columnId,
        boardId,
      },
      options
    );
  };

  return {
    onSubmit,
    form,
  };
};
