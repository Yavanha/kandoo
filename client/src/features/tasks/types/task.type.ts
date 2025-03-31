import { z } from "@kandoo/shared";
import { TaskFormSchema } from "../schemas";

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
  subtasks: Subtask[];
}

export type CreateTaskType = {
  title: string;
  description: string;
  columnId: string;
  subtasks: Pick<Subtask, "title">[];
};

export type TaskFormType = z.infer<typeof TaskFormSchema>;
