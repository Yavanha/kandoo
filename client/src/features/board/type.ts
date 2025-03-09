import { BoardColumn } from "../board-column";

export interface Board {
  id: string;
  name: string;
  columns: BoardColumn[];
}
