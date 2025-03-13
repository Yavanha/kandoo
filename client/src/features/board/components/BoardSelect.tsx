import { FC, useMemo, useState } from "react";
import { useBoardStore } from "../store/board.store";
import { Board } from "../types";
import { Select } from "@/core/desing-system";
import { ThemeSwitch } from "@/core/components";
import { BoardTriggerDialogForm } from "./BoardTriggerDialogForm";

type SelectBoardProps = {
  boards: Board[];
};

export const BoardSelect: FC<SelectBoardProps> = ({ boards }) => {
  const activeBoard = useBoardStore((state) => state.activeBoard);
  const setActiveBoard = useBoardStore((state) => state.setActiveBoard);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isDialogFormOpen, setIsDialogFormOpen] = useState(false);
  const selecteValudChangeHandler = (value: string) => {
    const selectedBoard = boards.find((board) => board.name === value);
    if (selectedBoard) {
      setActiveBoard(selectedBoard);
    }
  };

  const triggerDialogHandler = (isOpenDialog: boolean) => {
    setIsDialogFormOpen(isOpenDialog);
    setIsSelectOpen(false);
  };

  const boardNames = useMemo(() => boards.map(({ name }) => name), [boards]);

  if (!boards || boards.length === 0) {
    return (
      <BoardTriggerDialogForm
        isOpenDialog={isDialogFormOpen}
        onTrigger={triggerDialogHandler}
      />
    );
  }

  return (
    <Select
      value={activeBoard ? activeBoard.name : boardNames[0]}
      values={boardNames}
      placeholder="Select a board"
      onValueChange={selecteValudChangeHandler}
      isOpen={isSelectOpen}
      onOpenChange={() => setIsSelectOpen((prev) => !prev)}
    >
      <BoardTriggerDialogForm
        hasFlushEdges
        isOpenDialog={isDialogFormOpen}
        onTrigger={triggerDialogHandler}
      />
      <ThemeSwitch />
    </Select>
  );
};
