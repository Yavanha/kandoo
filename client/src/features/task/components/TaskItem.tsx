import { FC } from "react";
import { Task } from "../types";
import { useSetAtom } from "jotai";
import { triggerTaskDetailsFormDialogAtom } from "../store";
import { DialogTrigger } from "@/core/components";

type TaskItemProps = {
  data: Task;
};

export const TaskItem: FC<TaskItemProps> = ({ data }) => {
  const { title, subtasks } = data;
  const completedTasks = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;
  const triggerTaskDetailsFormDialog = useSetAtom(
    triggerTaskDetailsFormDialogAtom(data)
  );

  return (
    <li className="px-4 py-6 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-light-grey">
      <DialogTrigger openDialog={triggerTaskDetailsFormDialog}>
        <div className="flex flex-col gap-y-2 ">
          <h4 className="text-black heading-m text-left">{title}</h4>
          <p className="text-medium-grey body-m">
            {completedTasks} of {subtasks.length} subtasks
          </p>
        </div>
      </DialogTrigger>
    </li>
  );
};
