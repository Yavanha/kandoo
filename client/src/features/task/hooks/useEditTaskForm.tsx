import { SubmitHandler, useForm, UseFormProps } from "react-hook-form";
import { TaskFormType, UpdateTaskMutationDataType } from "../types/task.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTaskMutationOptions } from "./useTaskMutationOptions";
import { TaskFormSchema } from "../schemas";
import { useBoard } from "@/features/board/hooks";
import { useEditTask } from "./useEditTask";
import { useAtomValue } from "jotai";
import { activeTaskAtom } from "../store";
import { removedFieldsAtom } from "@/features/board/store";

export const useEditTaskForm = () => {
  const { editTaskMutation } = useEditTask();
  const activeBoard = useBoard();
  const activeTask = useAtomValue(activeTaskAtom);
  const removeSubtaskIds = useAtomValue(removedFieldsAtom);
  if (!activeTask) {
    throw new Error("No active task found");
  }
  const { id, title, description, status, columnId, subtasks } = activeTask;
  const defaultValues: TaskFormType = {
    title,
    description,
    status,
    list: subtasks.map(({ id: itemId, title }) => ({
      itemId,
      title,
    })),
  };
  const formProps: UseFormProps<TaskFormType> = {
    defaultValues,
    resolver: zodResolver(TaskFormSchema),
    shouldFocusError: true,
  };
  const form = useForm<TaskFormType>(formProps);
  const {
    reset,
    setError,
    formState: {
      dirtyFields: {
        title: isTitleDirty,
        description: isDescriptionDirty,
        list: isListDirty,
        status: isStatusDirty,
      },
    },
  } = form;
  const options = useTaskMutationOptions<
    UpdateTaskMutationDataType,
    TaskFormType
  >(reset, setError, defaultValues);
  const onSubmit: SubmitHandler<TaskFormType> = ({
    title,
    description,
    status,
    list: subtaskFields,
  }) => {
    if (!activeBoard) return;
    const { id: boardId } = activeBoard;
    editTaskMutation.mutate(
      {
        data: {
          id,
          ...(isTitleDirty ? { title } : {}),
          ...(isDescriptionDirty ? { description } : {}),
          ...(isStatusDirty ? { status } : {}),
          ...(isListDirty && subtaskFields.length > 0
            ? {
                subtasks: subtaskFields.map(({ title, itemId }) => ({
                  title,
                  ...(itemId ? { id: itemId } : {}),
                })),
              }
            : {}),
          columnId,
          ...(removeSubtaskIds.length > 0 ? { removeSubtaskIds } : {}),
        },
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
