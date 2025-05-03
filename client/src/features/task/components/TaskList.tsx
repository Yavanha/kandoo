import { FC } from "react";
import { TaskItem } from "./TaskItem";
import { Task } from "../types";

type TaskListProps = {
  items: Task[];
};

export const TaskList: FC<TaskListProps> = ({ items: tasks }) => {
  return (
    <ul className="flex flex-col gap-y-5 mt-6">
      {tasks.map((task) => (
        <TaskItem key={task.id} data={task} />
      ))}
    </ul>
  );
};
