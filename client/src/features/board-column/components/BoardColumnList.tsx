import { Paragraph } from "@/core/components";
import {
  ADD_NEW_COLUMN,
  NEW_COLUMNS,
  NO_BOARD_COLUMNS_MESSAGE,
} from "../constants";
import { Button } from "@/core/design-system";
import { BoardColumn } from "../types";
import { FC } from "react";
import { CreateBoardColumnForm } from "./CreateBoardColumnForm";
import { useAtom } from "jotai";
import { BoardColumnListItem } from "./BoardColumnListItem";
import { isBoardColumnCreateFormActiveAtom } from "../store";

type BoardColumnListProps = {
  list: BoardColumn[];
};

export const BoardColumnList: FC<BoardColumnListProps> = ({ list }) => {
  const [isBoardColumnCreateFormActive, setIsBoardColumnCreateFormActiveAtom] =
    useAtom(isBoardColumnCreateFormActiveAtom);

  if (!list.length && isBoardColumnCreateFormActive) {
    return (
      <div className="px-7 pt-4  max-w-[17.5rem] ">
        <CreateBoardColumnForm />
      </div>
    );
  }
  if (!list.length) {
    return (
      <article
        className={
          "flex flex-col gap-y-6 bg-light-grey min-h-[85lvh]  px-7 pt-4  justify-center items-center"
        }
      >
        <Paragraph
          text={NO_BOARD_COLUMNS_MESSAGE}
          size="heading-l"
          align="center"
        />
        <Button
          severity="primary"
          fit
          onClick={() => setIsBoardColumnCreateFormActiveAtom(true)}
        >
          {ADD_NEW_COLUMN}
        </Button>
      </article>
    );
  }

  let lastListElementItem = (
    <li className=" shrink-0 grow-0 basis-[17.5rem]  bg-lines-light  mt-10 flex items-center justify-center">
      <button
        className=" hover:text-primary text-medium-grey capitalize heading-xl cursor-pointer"
        onClick={() => setIsBoardColumnCreateFormActiveAtom(true)}
      >
        {NEW_COLUMNS}
      </button>
    </li>
  );
  if (isBoardColumnCreateFormActive) {
    lastListElementItem = (
      <li className="shrink-0 grow-0 basis-[17.5rem] ">
        <CreateBoardColumnForm />
      </li>
    );
  }
  return (
    <ul className="bg-light-grey  flex overflow-x-auto hid scrollbar-hide min-h-[88lvh] px-7 pt-4  gap-x-6">
      {list.map((column) => (
        <BoardColumnListItem key={column.id} column={column} />
      ))}
      {lastListElementItem}
    </ul>
  );
};
