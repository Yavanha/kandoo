import { BoardSelect, BoardDropdownMenu } from "@/features/board/components";
import { useBoard, useBoards } from "@/features/board/hooks";
import { triggerCreateFormDialogAtom } from "@/features/board/store/atoms";
import { Board } from "@/features/board/types";
import { useSetAtom } from "jotai";
import { DialogTrigger } from "../components";
import { Toolbar, Button } from "@radix-ui/react-toolbar";
import { triggerCreateTaskFormDialogAtom } from "@/features/tasks/store";

export const MainHeader = () => {
  const boards: Board[] = useBoards();
  const activeBoard = useBoard();
  const hasColumns = activeBoard && activeBoard.columns.length > 0;
  const triggerCreateFormDialog = useSetAtom(triggerCreateFormDialogAtom);
  const triggerCreateTaskFormDialog = useSetAtom(
    triggerCreateTaskFormDialogAtom
  );

  let selectOrDialogTrigger = (
    <DialogTrigger openDialog={triggerCreateFormDialog}>
      <p className="capitalize heading-m flex items-center gap-x-0.5 text-primary">
        <span className="inline-block align-middle">+</span> Create New Board
      </p>
    </DialogTrigger>
  );

  if (boards.length > 0) {
    selectOrDialogTrigger = <BoardSelect boards={boards} />;
  }

  return (
    <Toolbar className="sticky top-0 left-0 flex items-center bg-white px-4 py-5 justify-between">
      <div className="flex items-center gap-4">
        <Button>
          <img src="/icons/logo-mobile.svg" alt="menu" />
        </Button>
        {selectOrDialogTrigger}
      </div>
      {activeBoard && (
        <div className="flex items-center gap-x-4">
          <DialogTrigger
            openDialog={triggerCreateTaskFormDialog}
            disabled={!hasColumns}
          >
            <div className="bg-primary py-2.5 px-5  rounded-full ">
              <img src="/icons/icon-add-task-mobile.svg" alt="add task" />
            </div>
          </DialogTrigger>

          <BoardDropdownMenu />
        </div>
      )}
    </Toolbar>
  );
};
