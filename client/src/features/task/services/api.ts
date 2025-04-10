import { get } from "@/core/api/api";
import { Task } from "../types";

export const getTasksByBoardColumnId = (columnId: string) => {
  return get<Task[]>(`/columns/${columnId}/tasks`);
};
