export interface BoardColumn {
  id: string;
  title: string;
  boardId: string;
}

export interface UpdateBoardColumn {
  id?: string;
  title: string;
}

export type CreateBoardColumnType = {
  title: string;
};
