import { FC } from "react";
import { Subtask } from "../../tasks/types";
import { SubtaskItem } from "./SubtaskItem";

type SubtaskListProps = {
  subtasks: Subtask[];
  onToggleCompletion: (id: string) => void;
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
