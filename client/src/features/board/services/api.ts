import { get } from "@/core/api/api";
import { Board } from "@/features/board/types";

export const getBoards = () => {
  return get<Board[]>("/boards");
};
