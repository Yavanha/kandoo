import {
  CreateSubTask,
  Subtask,
  UpdateSubTask,
} from "@/features/subtask/types";
import { TaskFormSchema } from "../schemas";
import { z } from "@kandoo/shared";

export interface Status {
  id: string;
  value: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
  columnId: string;
}

export type CreateTask = {
  title: string;
  description: string;
  status: string;
  subtasks: CreateSubTask[];
};

export type UpdateTask = Partial<{
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: UpdateSubTask[];
  removeSubtaskIds?: string[];
  columnId: string;
}>;

export type CreateTaskMutationDataType = {
  data: CreateTask;
  columnId: string;
  boardId: string;
};

export type UpdateTaskMutationDataType = {
  data: UpdateTask;
  boardId: string;
};

export type TaskFormType = z.infer<typeof TaskFormSchema>;
