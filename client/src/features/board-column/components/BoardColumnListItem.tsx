import { FC } from "react";
import { BoardColumn } from "../types";
import { TaskList } from "@/features/tasks/components/TaskList";

type BoardColumnListItemProps = {
  column: BoardColumn;
};

export const BoardColumnListItem: FC<BoardColumnListItemProps> = ({
  column: { title, tasks },
}) => {
  return (
    <li className="shrink-0 grow-0 basis-[17.5rem]">
      <header className="before:content-[''] before:block before:bg-primary before:rounded-full flex items-center gap-x-3 before:w-[0.9375rem] before:h-[0.9375rem]">
        <h4 className="heading-s text-medium-grey uppercase tracking-widest">
          {title}
        </h4>
      </header>
      <TaskList items={tasks} />
    </li>
  );
};
