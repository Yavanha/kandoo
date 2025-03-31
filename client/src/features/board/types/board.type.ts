import { BoardColumn, UpdateBoardColumn } from "@/features/board-column";
import { z } from "@kandoo/shared";
import { BoardSchema, DeleteBoardShema } from "../schema";

export interface Board {
  id: string;
  name: string;
  columns: BoardColumn[];
}

export type CreateBoardType = {
  name: string;
  columns?: Pick<BoardColumn, "title">[];
};

export type UpdateBoardType = {
  id?: string;
  name?: string;
  columns?: UpdateBoardColumn[];
  removeColumnIds?: string[];
};

export type DeleteBoardType = z.infer<typeof DeleteBoardShema>;

export type BoardFormType = z.infer<typeof BoardSchema>;

export type BoardActionMode = "CREATE" | "EDIT" | "DELETE" | "CREATE_TASK";
