import { FC, useState } from "react";
import { Task } from "../types";
import { CURRENT_STATUS_LABEL, TASK_STATUS_PLACEHOLDER } from "../constants";
import { Label, Select } from "@/core/design-system";
import { SubtaskList } from "@/features/subtask/components";
import { TaskDropdownMenu } from "./TaskDropdownMenu";
import { useBoard } from "@/features/board/hooks";
import { useEditTask } from "../hooks";

export type TaskProps = {
  data: Task;
};

export const TaskDetailsCard: FC<TaskProps> = ({
  data: { title, description, subtasks, status: currentStatus, columnId, id },
}) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const { editTaskMutation } = useEditTask();
  const [selectedStatus, setSelectedStatus] = useState<string>(currentStatus);
  const activeBaord = useBoard();
  const status = activeBaord?.columns.map(({ title }) => title) || [];
  const handleSelectChange = (value: string) => {
    editTaskMutation.mutate(
      {
        data: { status: value, id, columnId },
        boardId: activeBaord?.id || "",
      },
      {
        onSuccess: () => {
          setSelectedStatus(value);
          setIsOpenSelect(false);
        },
      }
    );
  };

  return (
    <article className="bg-white rounded-lg  p-4 flex flex-col gap-y-6">
      <header className="flex items-center justify-between">
        <h3 className="heading-l text-black">{title}</h3>
        <TaskDropdownMenu />
      </header>
      <p className="body-l text-medium-grey ">{description}</p>

      <SubtaskList subtasks={subtasks} />

      <div>
        <Label label={CURRENT_STATUS_LABEL} />
        <Select
          mode="form"
          value={selectedStatus}
          values={status}
          placeholder={TASK_STATUS_PLACEHOLDER}
          isOpen={isOpenSelect}
          onOpenChange={setIsOpenSelect}
          onValueChange={handleSelectChange}
        />
      </div>
    </article>
  );
};
