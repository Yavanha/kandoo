import { BoardColumn } from "@/features/board-column";
import { z } from "@kandoo/shared";
import { BoardSchema } from "../schema";

export interface Board {
  id: string;
  name: string;
  columns: BoardColumn[];
}

export type CreateBoardType = {
  name: string;
  columns: Pick<BoardColumn, "title">[];
};

export type UpdateBoardType = CreateBoardType & {
  id?: string;
};

export type BoardFormType = z.infer<typeof BoardSchema>;

export type BoardActionMode = "CREATE" | "EDIT" | "DELETE";
