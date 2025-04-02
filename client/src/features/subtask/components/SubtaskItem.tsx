import { FC, useState } from "react";

import { useCompleteSubtask } from "../hook";
import { Subtask } from "../types";

type SubtaskItemProps = {
  subtask: Subtask;
};

export const SubtaskItem: FC<SubtaskItemProps> = ({ subtask }) => {
  const { completeSubtaskMutation } = useCompleteSubtask();
  const [isCompleted, setIsCompleted] = useState(subtask.isCompleted);
  return (
    <li className="bg-light-grey rounded-lg p-2 my-2 hover:bg-primary-hover cursor-pointer">
      <div className="flex items-center gap-x-2">
        <input
          type="checkbox"
          className="checked:bg-primary"
          checked={isCompleted}
          onChange={() => {
            completeSubtaskMutation.mutate(
              {
                id: subtask.id,
                isCompleted: !isCompleted,
              },
              {
                onSuccess: () => {
                  setIsCompleted(!isCompleted);
                },
              }
            );
          }}
        />
        <label className="body-m text-black font-bold">{subtask.title}</label>
      </div>
    </li>
  );
};
