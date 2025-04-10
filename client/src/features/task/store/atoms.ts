import { atom } from "jotai";
import { Task } from "../types";
import { openModalAtom } from "@/widgets/app-dialog/atoms";
import { isBoardColumnCreateFormActiveAtom } from "@/features/board-column/store";
export const isOpenTaskDropdownMenuAtom = atom(false);

export const triggerCreateTaskFormDialogAtom = atom(null, (_, set) => {
  set(isBoardColumnCreateFormActiveAtom, false);
  set(openModalAtom<"CREATE_TASK">(), {
    type: "CREATE_TASK",
    data: {},
  });
});
export const activeTaskAtom = atom<Task | null>(null);

export const triggerTaskDetailsFormDialogAtom = (activeTask: Task) =>
  atom(null, (_, set) => {
    set(isBoardColumnCreateFormActiveAtom, false);
    set(activeTaskAtom, activeTask);
    set(openModalAtom<"DETAILS_TASK">(), {
      type: "DETAILS_TASK",
      data: {
        data: activeTask,
      },
    });
  });

export const triggerEditTaskFormDialogAtom = atom(null, (_, set) => {
  set(openModalAtom<"EDIT_TASK">(), {
    type: "EDIT_TASK",
    data: {},
  });
});
export const triggerDeleteTaskFormDialogAtom = atom(null, (_, set) => {
  set(openModalAtom<"DELETE_TASK">(), {
    type: "DELETE_TASK",
    data: {},
  });
});
