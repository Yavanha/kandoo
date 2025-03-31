import { FC } from "react";
import { TASK_SUBMIT_LABEL } from "../../constants";
import { useCreateTaskForm } from "../../hooks/useCreateTaskForm";
import { TaskForm } from "./TaskForm";

type TaskFormProps = {
  status: string[];
};

export const CreateTaskForm: FC<TaskFormProps> = ({ status }) => {
  const { form, onSubmit } = useCreateTaskForm();

  return (
    <TaskForm
      form={form}
      submitLabel={TASK_SUBMIT_LABEL}
      onSubmit={onSubmit}
      status={status}
    />
  );
};
