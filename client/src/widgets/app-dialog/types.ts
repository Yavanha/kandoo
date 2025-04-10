import { TaskProps } from "@/features/task/components/TaskDetailsCard";
import { FC } from "react";

export interface ModalContentMapProps {
  CREATE_BOARD: Record<string, never>;
  EDIT_BOARD: Record<string, never>;
  DELETE_BOARD: Record<string, never>;
  CREATE_TASK: Record<string, never>;
  EDIT_TASK: Record<string, never>;
  DELETE_TASK: Record<string, never>;
  DETAILS_TASK: TaskProps;
}
export type ModalContentProps<T extends keyof ModalContentMapProps> = {
  type: T;
  data: ModalContentMapProps[T];
};

export type RenderModalContentComponent = {
  [K in keyof ModalContentMapProps]: FC<ModalContentMapProps[K]>;
};

export type Payload<T extends keyof ModalContentMapProps> =
  ModalContentProps<T> & {
    title?: string;
  };
