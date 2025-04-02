import { FC } from "react";
import { BoardColumn } from "../types";

type BoardColumnListItemProps = {
  column: BoardColumn;
};

export const BoardColumnListItem: FC<BoardColumnListItemProps> = ({
  column: { id, title, tasks },
}) => {
  console.log("BoardColumnListItem", { id, tasks });
  return (
    <li key={id} className="shrink-0 grow-0 basis-[17.5rem]">
      <header className="before:content-[''] before:block before:bg-primary before:rounded-full flex items-center gap-x-3 before:w-[0.9375rem] before:h-[0.9375rem]">
        <h4 className="heading-s text-medium-grey uppercase tracking-widest">
          {title}
        </h4>
      </header>
      <ul className="flex flex-col gap-y-5 mt-6">
        {tasks.map(({ id, title, subtasks }) => {
          console.log({ subtasks });
          const completedTasks = subtasks.filter(
            (subtask) => subtask.isCompleted
          ).length;
          return (
            <li
              key={id}
              className="flex flex-col gap-y-2 px-4 py-6 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-light-grey"
            >
              <h4 className="text-black headeing-m">{title}</h4>
              <p className="text-medium-grey body-m">
                {completedTasks} of {subtasks.length} subtasks
              </p>
            </li>
          );
        })}
      </ul>
    </li>
  );
};
