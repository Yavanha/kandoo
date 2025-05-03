import { post } from "@/core/api";

export const completeSubtask = async (subtaskId: string) => {
  return post(`/subtasks/${subtaskId}/complete`);
};
