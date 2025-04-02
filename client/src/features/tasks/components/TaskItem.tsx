import { FC } from "react";
import { Task } from "../types";

type TaskItemProps = {
  data: Task;
};

export const TaskItem: FC<TaskItemProps> = ({ data }) => {
  const { title, subtasks } = data;
  const completedTasks = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  return (
    <li className="flex flex-col gap-y-2 px-4 py-6 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-light-grey">
      <h4 className="text-black headeing-m">{title}</h4>
      <p className="text-medium-grey body-m">
        {completedTasks} of {subtasks.length} subtasks
      </p>
    </li>
  );
};
