import { FC } from "react";
import { Board } from "../types";
import { Select } from "@/core/desing-system";
import { useAtom, useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import {
  activeBoardAtom,
  isOpenBoardSelectAtom,
  triggerCreateFormDialogAtom,
} from "../store/atoms";
import { ThemeSwitch, DialogTrigger } from "@/core/components";
type SelectBoardProps = {
  boards: Board[];
};

export const BoardSelect: FC<SelectBoardProps> = ({ boards }) => {
  const [activeBoard, setActiveBoard] = useAtom(activeBoardAtom);
  const triggerCreateFormDialog = useSetAtom(triggerCreateFormDialogAtom);
  const [isOpenBoardSelect, setIsOpenBoardSelect] = useAtom(
    isOpenBoardSelectAtom
  );
  useHydrateAtoms([[activeBoardAtom, boards[0]]]);

  const boardNames = boards.map(({ name }) => name);

  const selecteValudChangeHandler = (value: string) => {
    const selectedBoard = boards.find((board) => board.name === value);
    if (selectedBoard) {
      setActiveBoard(selectedBoard);
      setIsOpenBoardSelect(false);
    }
  };

  return (
    <Select
      value={activeBoard ? activeBoard.name : undefined}
      values={boardNames}
      placeholder="Select a board"
      onValueChange={selecteValudChangeHandler}
      isOpen={isOpenBoardSelect}
      onOpenChange={setIsOpenBoardSelect}
    >
      <DialogTrigger hasFlushEdges openBoardDialog={triggerCreateFormDialog}>
        <img src="/icons/icon-board.svg" alt="board icon" className="block" />
        <p className="capitalize heading-m flex items-center gap-x-0.5 text-primary">
          <span className="inline-block align-middle">+</span> Create New Board
        </p>
      </DialogTrigger>
      <ThemeSwitch />
    </Select>
  );
};
