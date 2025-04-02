import { CreateSubTask } from "@/features/subtask/types/subtask.type";
import { TaskFormSchema } from "../schemas";
import { z } from "@kandoo/shared";
export interface Subtask {
  title: string;
  isCompleted: boolean;
}
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
}

export type CreateTask = {
  title: string;
  description: string;
  status: string;
  subtasks: CreateSubTask[];
};

export type CreateTaskMutationDataType = {
  data: CreateTask;
  columnId: string;
  boardId: string;
};

export type TaskFormType = z.infer<typeof TaskFormSchema>;
