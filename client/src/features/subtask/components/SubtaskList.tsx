import { FC } from "react";

import { SubtaskItem } from "./SubtaskItem";
import { Subtask } from "../types";

type SubtaskListProps = {
  subtasks: Subtask[];
};

export const SubtaskList: FC<SubtaskListProps> = ({ subtasks }) => {
  const completedTasks = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  return (
    <div>
      <p className="text-medium-grey body-m mb-4">
        Subtasks {completedTasks} of {subtasks.length}
      </p>
      <ul>
        {subtasks.map((subtask) => (
          <SubtaskItem key={subtask.id} subtask={subtask} />
        ))}
      </ul>
    </div>
  );
};
