import { FC, useState } from "react";
import { Task } from "../types";
import { CURRENT_STATUS_LABEL, TASK_STATUS_PLACEHOLDER } from "../constants";
import { Label, Select } from "@/core/design-system";
import { SubtaskList } from "@/features/subtask/components";

type TaskProps = {
  data: Task;
  status: string[];
};

export const TaskDetailsCard: FC<TaskProps> = ({
  data: { title, description, subtasks, status: currentStatus },
  status,
}) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);

  const handleToggleSubtask = (id: string) => {
    /* Handle subtask completion */
    console.log(`Toggle completion for subtask: ${id}`);
  };

  return (
    <article className="bg-white rounded-lg  p-4 flex flex-col gap-y-6">
      <header>
        <h3 className="heading-l text-black">{title}</h3>
      </header>
      <p className="body-l text-medium-grey ">{description}</p>

      <SubtaskList
        subtasks={subtasks}
        onToggleCompletion={handleToggleSubtask}
      />

      <div>
        <Label label={CURRENT_STATUS_LABEL} />
        <Select
          mode="form"
          value={currentStatus}
          values={status}
          placeholder={TASK_STATUS_PLACEHOLDER}
          isOpen={isOpenSelect}
          onOpenChange={setIsOpenSelect}
          onValueChange={(value: string) => console.log(value)}
        />
      </div>
    </article>
  );
};
