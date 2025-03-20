import { GenricListItemFormType } from "@/core/types";
import { BoardColumn, UpdateBoardColumn } from "@/features/board-column";

export const transformListFieldsToBoardColumnDelta = (
  activeBoardColumns: BoardColumn[],
  fields: GenricListItemFormType[]
) => {
  if (fields.length === 0) return;
  const activeList = new Map<string, string>(
    activeBoardColumns.map(({ id, title }) => [id, title])
  );
  const updatedBoardColumns: UpdateBoardColumn[] = [];

  fields.forEach(({ itemId, title }) => {
    if (!itemId) {
      updatedBoardColumns.push({
        title,
      });
      return;
    }
    const currentBoardColumnTitle = activeList.get(itemId);
    if (currentBoardColumnTitle === title) return;

    updatedBoardColumns.push({
      id: itemId,
      title,
    });
  });

  return updatedBoardColumns;
};
