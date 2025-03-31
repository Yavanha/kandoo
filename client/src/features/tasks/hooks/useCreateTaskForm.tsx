import { SubmitHandler, useForm, UseFormProps } from "react-hook-form";
import { TaskFormType, CreateTaskType } from "../types/task.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTask } from "./useCreateTask";
// import { useMutationOptions } from "./useMutateOptions";
import { TaskFormSchema } from "../schemas";
import { useBoard } from "@/features/board/hooks";

export const useCreateTaskForm = () => {
  //   const { createTaskMutation } = useCreateTask();
  const activeBoard = useBoard();
  const defaultValues = {
    title: "",
    description: "",

    status: "",
    list: [],
  };
  const formProps: UseFormProps<TaskFormType> = {
    ...defaultValues,
    resolver: zodResolver(TaskFormSchema),
    shouldFocusError: true,
  };
  const form = useForm<TaskFormType>(formProps);
  //   const { reset, setError } = form;
  //   const options = useMutationOptions<CreateTaskType, TaskFormType>(
  //     reset,
  //     setError,
  //     defaultValues
  //   );
  const onSubmit: SubmitHandler<TaskFormType> = ({
    title,
    description,
    status,
    list,
  }) => {
    const columnId = activeBoard?.columns.find(
      (column) => column.title === status
    )?.id;
    if (!columnId) return;
    console.log({
      title,
      description,
      columnId,
      subtasks: list.map(({ title }) => ({
        title,
      })),
    });

    // createTaskMutation.mutate(
    //   {
    //     title,
    //     description,
    //     columnId,
    //     subtasks: list.map(({ title }) => ({
    //       title,
    //     })),
    //   },
    //   options
    // );
  };

  return {
    onSubmit,
    form,
  };
};
