import { ReactElement, useMemo } from "react";
import { CreateBoardForm, EditBoardForm } from "../components";
import {
  CREATE_BOARD_DIALOG_TITLE,
  DELETE_BOARD_DIALOG_TITLE,
  EDIT_BOARD_DIALOG_TITLE,
} from "../constants/constants";
import { BoardActionMode } from "../types";
import { useBoard } from "./useBoard";
import { DeleteBoardForm } from "../components/form/DeleteBoardForm";
import { CreateTaskForm } from "@/features/tasks/components/form/CreateTaskForm";
import { CREATE_TASK_DIALOG_TITLE } from "@/features/tasks/constants";

export const useBoardFormMap = () => {
  const activeBoard = useBoard();
  const boardFormMap = useMemo(
    () =>
      new Map<BoardActionMode, { element: ReactElement; dialogTitle: string }>([
        [
          "CREATE",
          {
            element: <CreateBoardForm />,
            dialogTitle: CREATE_BOARD_DIALOG_TITLE,
          },
        ],
      ]),
    []
  );

  if (activeBoard) {
    boardFormMap.set("EDIT", {
      element: <EditBoardForm />,
      dialogTitle: EDIT_BOARD_DIALOG_TITLE,
    });
    boardFormMap.set("DELETE", {
      element: <DeleteBoardForm />,
      dialogTitle: DELETE_BOARD_DIALOG_TITLE,
    });
    boardFormMap.set("CREATE_TASK", {
      element: (
        <CreateTaskForm
          status={activeBoard.columns.map(({ title }) => title)}
        />
      ),
      dialogTitle: CREATE_TASK_DIALOG_TITLE,
    });
  } else {
    boardFormMap.delete("EDIT");
    boardFormMap.delete("DELETE");
  }

  return {
    boardFormMap,
  };
};
