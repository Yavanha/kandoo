import { BoardColumn } from "@/features/board-column";
import { z, Operation } from "@kandoo/shared";
import { BoardSchema, DeleteBoardShema } from "../schema";

export interface Board {
  id: string;
  name: string;
  columns: BoardColumn[];
}

export type CreateBoardType = {
  name: string;
  columns?: Partial<BoardColumn>[];
};

export type UpdateBoardType = {
  id?: string;
  operations: Operation[];
};

export type DeleteBoardType = z.infer<typeof DeleteBoardShema>;

export type BoardFormType = z.infer<typeof BoardSchema>;

export type BoardActionMode = "CREATE" | "EDIT" | "DELETE";
