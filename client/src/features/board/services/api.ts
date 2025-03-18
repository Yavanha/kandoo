import { get } from "@/core/api/api";
import { Board } from "@/features/board/types";

export const getBoards = () => {
  return get<Board[]>("/boards");
};

export const getBoard = (id: string) => {
  return get<Board>(`/boards/${id}`);
};
