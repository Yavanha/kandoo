import { Paragraph } from "@/core/components";

import { NEW_COLUMNS, NO_BOARD_COLUMNS_MESSAGE } from "../constants";
import { Button } from "@/core/desing-system";
import { BoardColumn } from "../types";
import { FC } from "react";
import { CreateBoardColumnForm } from "./CreateBoardColumnForm";
import { useAtom } from "jotai";
import { isBoardColumnCreateFormActiveAtom } from "@/features/board/store/atoms";

type BoardColumnListProps = {
  list: BoardColumn[];
};

export const BoardColumnList: FC<BoardColumnListProps> = ({ list }) => {
  const [isBoardColumnCreateFormActive, setIsBoardColumnCreateFormActiveAtom] =
    useAtom(isBoardColumnCreateFormActiveAtom);

  if (!list.length && isBoardColumnCreateFormActive) {
    return (
      <div className="px-7 pt-4   ">
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
          + Add New Column
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
      <li>
        <CreateBoardColumnForm />
      </li>
    );
  }
  return (
    <ul className="bg-light-grey  flex overflow-x-auto hid scrollbar-hide min-h-[80lvh] px-7 pt-4  gap-x-6">
      {list.map(({ id, title }) => {
        return (
          <li key={id} className="shrink-0 grow-0 basis-[17.5rem]">
            <header className="before:content-[''] before:block before:bg-primary before:rounded-full  flex items-center gap-x-3 before:w-[0.9375rem] before:h-[0.9375rem]">
              <h4 className="heading-s text-medium-grey uppercase tracking-widest">
                {title}
              </h4>
            </header>
          </li>
        );
      })}
      {lastListElementItem}
    </ul>
  );
};
