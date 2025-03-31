import { z } from "zod";
export const TaskFormSchema = z.object({
  title: z
    .string()
    .nonempty("The task title is required")
    .max(20, "The task title is too long (max 20 characters)"),
  description: z
    .string()
    .nonempty("The task description is required")
    .max(200, "The task description is too long (max 200 characters)"),
  status: z.string().nonempty("The task status is required"),
  list: z
    .object({
      title: z
        .string()
        .nonempty("The list title is required")
        .max(20, "The list title is too long (max 20 characters)"),
      itemId: z.string().uuid().optional(),
    })
    .array(),
});
