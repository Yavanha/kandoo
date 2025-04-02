export type CreateSubTask = {
  title: string;
};

export type CompleteSubtask = {
  id: string;
  isCompleted: boolean;
};

export interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}
