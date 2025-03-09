import { Board, KanbanData } from "../../types/kanban";
import data from "./data.json";

export const getKanbanData = (): KanbanData => {
  return data as KanbanData;
};

export const getBoardByName = (name: string): Board | undefined => {
  const kanbanData = getKanbanData();
  return kanbanData.boards.find((board) => board.name === name);
};

export const getAllBoardsNames = (): string[] => {
  const kanbanData = getKanbanData();
  return kanbanData.boards.map((board) => board.name);
};
