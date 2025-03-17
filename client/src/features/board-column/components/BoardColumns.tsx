import { Paragraph } from "@/core/components";
import { activeBoardAtom } from "@/features/board/store/atoms";
import { useAtomValue } from "jotai";
import {
  NEW_COLUMNS,
  NO_BOARD_COLUMNS_MESSAGE,
  NO_BOARD_SELECTED,
} from "../constants";
import { Button } from "@/core/desing-system";

export const BoardColumns = () => {
  const activeBoard = useAtomValue(activeBoardAtom);

  if (!activeBoard) {
    return (
      <article className="flex flex-col gap-y-6  bg-light-grey min-h-[85lvh]  justify-center items-center">
        <Paragraph text={NO_BOARD_SELECTED} />
      </article>
    );
  }
  if (!activeBoard.columns.length) {
    return (
      <article className="flex flex-col gap-y-6 bg-light-grey min-h-[85lvh]  justify-center items-center p-4">
        <Paragraph
          text={NO_BOARD_COLUMNS_MESSAGE}
          size="heading-l"
          align="center"
        />
        <Button severity="primary" fit>
          + Add New Column
        </Button>
      </article>
    );
  }
  const { columns } = activeBoard;
  return (
    <ul className="bg-light-grey  flex overflow-x-auto hid scrollbar-hide min-h-[90lvh] px-4 py-6  gap-x-6">
      {columns.map(({ id, title }) => {
        return (
          <li key={id} className="shrink-0 grow-0 basis-[17.5rem]">
            <header className="before:content-[''] before:block before:bg-primary before:rounded-full before flex items-center gap-x-3 before:w-[0.9375rem] before:h-[0.9375rem]">
              <h4 className="heading-s text-medium-grey uppercase tracking-widest">
                {title}
              </h4>
            </header>
          </li>
        );
      })}
      <li className=" shrink-0 grow-0 basis-[17.5rem]  bg-lines-light cursor-pointer mt-10 flex items-center justify-center">
        <button className=" hover:text-primary text-medium-grey capitalize heading-xl">
          {NEW_COLUMNS}
        </button>
      </li>
    </ul>
  );
};
