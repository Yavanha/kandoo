import {
  CreateBoardForm,
  EditBoardForm,
  DeleteBoardForm,
} from "@/features/board/components";
import {
  CreateTaskForm,
  EditTaskForm,
  DeleteTaskForm,
  TaskDetailsCard,
} from "@/features/task/components";
import { RenderModalContentComponent } from "./types";

export const renderModalContent: RenderModalContentComponent = {
  CREATE_BOARD: CreateBoardForm,
  EDIT_BOARD: EditBoardForm,
  DELETE_BOARD: DeleteBoardForm,
  CREATE_TASK: CreateTaskForm,
  EDIT_TASK: EditTaskForm,
  DELETE_TASK: DeleteTaskForm,
  DETAILS_TASK: TaskDetailsCard,
};
