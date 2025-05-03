import { FC } from "react";
import { CREATE_TASK_SUBMIT_LABEL } from "../../constants";
import { useCreateTaskForm } from "../../hooks/useCreateTaskForm";
import { TaskForm } from "./TaskForm";
import { useBoard } from "@/features/board/hooks";

export const CreateTaskForm: FC = () => {
  const { form, onSubmit } = useCreateTaskForm();
  const activeBoard = useBoard();
  const status = activeBoard?.columns.map(({ title }) => title) || [];
  return (
    <TaskForm
      form={form}
      submitLabel={CREATE_TASK_SUBMIT_LABEL}
      onSubmit={onSubmit}
      status={status}
    />
  );
};
