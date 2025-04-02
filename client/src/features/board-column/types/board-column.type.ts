import { Task } from "@/features/tasks/types";

export interface BoardColumn {
  id: string;
  title: string;
  boardId: string;
  tasks: Task[];
}

export interface UpdateBoardColumn {
  id?: string;
  title: string;
}

export type CreateBoardColumn = {
  title: string;
};
