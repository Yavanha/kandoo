import { FC } from "react";
import { EDIT_TASK_SUBMIT_LABEL } from "../../constants";
import { TaskForm } from "./TaskForm";
import { useBoard } from "@/features/board/hooks";
import { useEditTaskForm } from "../../hooks";

export const EditTaskForm: FC = () => {
  const { form, onSubmit } = useEditTaskForm();
  const activeBoard = useBoard();
  const status = activeBoard?.columns.map(({ title }) => title) || [];
  return (
    <TaskForm
      form={form}
      submitLabel={EDIT_TASK_SUBMIT_LABEL}
      onSubmit={onSubmit}
      status={status}
    />
  );
};
