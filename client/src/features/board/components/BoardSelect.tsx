import { FC } from "react";
import { Board } from "../types";
import { Select } from "@/core/design-system";
import { useAtom, useSetAtom } from "jotai";
import {
  isOpenBoardSelectAtom,
  triggerCreateFormDialogAtom,
} from "../store/atoms";
import { ThemeSwitch, DialogTrigger } from "@/core/components";
import { useNavigate } from "@tanstack/react-router";
import { useBoard } from "../hooks";
type SelectBoardProps = {
  boards: Board[];
};

export const BoardSelect: FC<SelectBoardProps> = ({ boards }) => {
  const navigate = useNavigate();
  const triggerCreateFormDialog = useSetAtom(triggerCreateFormDialogAtom);
  const [isOpenBoardSelect, setIsOpenBoardSelect] = useAtom(
    isOpenBoardSelectAtom
  );
  const boardNames = boards.map(({ name }) => name);
  const activeBoard = useBoard();
  const selecteValueChangeHandler = (value: string) => {
    const selectedBoard = boards.find((board) => board.name === value);
    if (selectedBoard) {
      navigate({
        to: "/boards/$id",
        params: {
          id: selectedBoard.id,
        },
      });
      setIsOpenBoardSelect(false);
    }
  };

  return (
    <Select
      value={activeBoard?.name || ""}
      values={boardNames}
      placeholder="Select a board"
      onValueChange={selecteValueChangeHandler}
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
