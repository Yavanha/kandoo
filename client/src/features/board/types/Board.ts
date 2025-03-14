import { BoardColumn } from "@/features/board-column";
import { z } from "@kandoo/shared";
import { boardSchema } from "../schema";

export interface Board {
  id: string;
  name: string;
  columns: BoardColumn[];
}

export type BoardFields = z.infer<typeof boardSchema>;

export type BoardActionMode = "CREATE" | "EDIT" | "DELETE";
