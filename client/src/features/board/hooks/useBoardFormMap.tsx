import { ReactElement, useMemo } from "react";
import { CreateBoardForm, EditBoardForm } from "../components";
import { DeleteBoardForm } from "../components/DeleteBoardForm";
import { DELETE_BOARD_DIALOG } from "../constants/constants";
import { BoardActionMode } from "../types";
import { useBoard } from "./useBoard";

export const useBoardFormMap = () => {
  const activeBoard = useBoard();
  const boardFormMap = useMemo(
    () =>
      new Map<BoardActionMode, { element: ReactElement; dialogTitle: string }>([
        [
          "CREATE",
          { element: <CreateBoardForm />, dialogTitle: "Add New Board" },
        ],
      ]),
    []
  );

  if (activeBoard) {
    boardFormMap.set("EDIT", {
      element: <EditBoardForm />,
      dialogTitle: "Edit Board",
    });
    boardFormMap.set("DELETE", {
      element: <DeleteBoardForm />,
      dialogTitle: DELETE_BOARD_DIALOG,
    });
  } else {
    boardFormMap.delete("EDIT");
    boardFormMap.delete("DELETE");
  }

  return {
    boardFormMap,
  };
};
